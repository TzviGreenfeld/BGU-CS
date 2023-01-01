﻿#pragma once
#include <cmath>
#include "globals.h"
#include "Vertex.h"
using namespace std;


class Triangle
{
public:
	Triangle(const GLfloat v1[3], const GLfloat v2[3], const GLfloat v3[3])
		: v1{ v1[0], v1[1], v1[2] },
		v2{ v2[0], v2[1], v2[2] },
		v3{ v3[0], v3[1], v3[2] } {}

	Triangle(const int x, const int y)
		: x(x), y(y)
	{
		// x1, y1, z1
		v1[0] = float(x);
		v1[1] = height(x, y);
		v1[2] = float(y);

		// x2, y2, z2
		v2[0] = float(x) + STEP_SIZE;
		v2[1] = height(x + STEP_SIZE, y);
		v2[2] = float(y);

		// x3, y3, z3
		v3[0] = float(x);
		v3[1] = height(x, y + STEP_SIZE);
		v3[2] = float(y) + STEP_SIZE;
	}

	void draw()
	{
		// set vertex color set it to wwhite if this.hit
		glBegin(GL_TRIANGLES);
		SetVertexColor(v1[1]);
		glVertex3f(v1[0], v1[1], v1[2]);
		SetVertexColor(v2[1]);
		glVertex3f(v2[0], v2[1], v2[2]);
		SetVertexColor(v3[1]);
		glVertex3f(v3[0], v3[1], v3[2]);
		glEnd();

		drawOutline();

	}


	void drawOutline()
	{
		glColor4f(0.0, 0.0, 0.0, 0.2);
		glBegin(GL_LINE_LOOP);
		glVertex3f(v1[0], v1[1], v1[2]);
		glVertex3f(v2[0], v2[1], v2[2]);
		glVertex3f(v3[0], v3[1], v3[2]);
		glEnd();
	}

	void drawIdColor()
	{
		int i = id;
		// unique color by openGL doc
		int r = (i & 0x000000FF) >> 0;
		int g = (i & 0x0000FF00) >> 8;
		int b = (i & 0x00FF0000) >> 16;

		// store in this.color for easy access
		color.r = r;
		color.g = g;
		color.b = b;

		// glColor3f(r, g, b);
		glColor3ub(r, g, b);

		// draw as solid color
		glBegin(GL_TRIANGLES);
		glVertex3f(v1[0], v1[1], v1[2]);
		glVertex3f(v2[0], v2[1], v2[2]);
		glVertex3f(v3[0], v3[1], v3[2]);
		glEnd();
	}

	Triangle *getAdjecentTriangle()
	{

		GLfloat adj_v1[3] = { v3[0], v3[1], v3[2] };
		GLfloat adj_v2[3] = { v2[0], v2[1], v2[2] };
		GLfloat adj_v3[3] = { float(x) + STEP_SIZE, height(x + STEP_SIZE, y + STEP_SIZE), float(y) + STEP_SIZE };

		Triangle *res = new Triangle(adj_v1, adj_v2, adj_v3);
		res->setXY(x, y);
		return res;
	}

	void paint() {
		this->userColor = TRUE;
	}

	float height(int X, int Y) // This Returns The Height From A Height Map Index
	{
		int x = X % heightMap.rows;
		int y = Y % heightMap.cols;

		if (!&heightMap)
			return 0;
		// map values from [0,256] to [0, 61] in order to use the map in color_scale_01.png
		return 61.0 * heightMap.at<Vec3b>(Point(y, x)).val[0] / 256.0;
	}

	float* getCenter() {
		float * center = new float[3];
		center[0] = (v1[0] + v2[0] + v3[0]) / 3;
		center[1] = (v1[1] + v2[1] + v3[1]) / 3;
		center[2] = (v1[2] + v2[2] + v3[2]) / 3;

		return center;
	}

	void pick()
	{
		hit = !hit;
		//hit = TRUE;
		draw();
		drawOutline();
	}

	void setXY(int x, int y)
	{
		this->x = x;
		this->y = y;
	}

	void setID(int id)
	{
		this->id = id;
	}

	static int getTriangleID(int r, int g, int b)
	{
		int i = (r << 0) | (g << 8) | (b << 16);
		return i;
	}


	// Calculate the area of the triangle formed by A, B, and C
	float triangleArea(Point A, Point B, Point C) {
		return std::abs((A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y)) / 2);
	}

	// Check if point P is inside the triangle formed by A, B, and C
	bool isPointInTriangle(float* mid) {
		cout << mid[0] << endl;
		cout << mid[1] << endl;
		Point P;
		P.x = mid[0];
		P.y = mid[1];
		// Calculate the area of the triangle formed by A, B, and C
		Point A, B, C;
		A.x = this->v1[0];
		A.y = this->v1[1];

		B.x = this->v2[0];
		B.y = this->v2[1];

		C.x = this->v3[0];
		C.y = this->v3[1];
		float triangleArea = this->triangleArea(A, B, C);

		// Calculate the areas of the three triangles formed by P and the sides of the triangle
		float areaPAB = this->triangleArea(P, A, B);
		float areaPBC = this->triangleArea(P, B, C);
		float areaPCA = this->triangleArea(P, C, A);

		// If the sum of the areas of these three triangles is equal to the area of the original triangle,
		// then P is inside the triangle
		return std::abs(triangleArea - (areaPAB + areaPBC + areaPCA)) < 1e-9;
	}

	void SetVertexColor(int fColor) // This Sets The Color Value For A Particular Index
	{
		if (this->userColor) {
			glColor3f(1.0, 1.0, 1.0);
			return;
		}
		// fcolor is the height of a vertex (y value) and sould be in range [0,61]
		if (this->hit)
		{
			// paint it white if hit
			glColor3f(1.0, 1.0, 1.0);
			return;
		}
		float height = fColor / 61.0;


		GLfloat alpha = 1;
		if (fColor < 15.8)
		{
			glColor3f(0.4f, 0.4f, 0.4f);
		}
		// dark gray
		else if (fColor < 21.45)
		{
			glColor4f(0, 0, 255, alpha);
		}
		else if (fColor < 27.10)
		{
			glColor4f(0, 128, 255, alpha);
		}
		else if (fColor < 32.75)
		{
			glColor4f(0, 255, 255, alpha);
		}
		else if (fColor < 28.40)
		{
			glColor4f(0, 255, 128, alpha);
		}
		else if (fColor < 44.05)
		{
			glColor4f(0, 255, 0, alpha);
		}
		else if (fColor < 49.70)
		{
			glColor4f(255, 255, 0, alpha);
		}
		else if (fColor < 55.35)
		{
			glColor4f(255, 128, 0, alpha);
		}
		else if (fColor < 61.00)
		{
			glColor4f(255, 0, 0, alpha);
		}
		else
		{
			glColor3f(255, 255, 255);
		} // white
	}

	struct Color
	{
		GLubyte r;
		GLubyte g;
		GLubyte b;
	};

	GLfloat v1[3], v2[3], v3[3];
	int x, y;
	int id;
	Color color;
	bool hit = FALSE;
	bool userColor = FALSE;
	bool debug = FALSE;
};