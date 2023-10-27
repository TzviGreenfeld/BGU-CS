#pragma once
#include "globals.h"
class Weather {
public:
	//fog
	float fogIntensity = 0.0;

	void initFog() {
		GLfloat fogColor[4] = { 0.5, 0.5, 0.5, 0.2 };
		if (fogIntensity > 0.0) {
			glClearColor(0.5, 0.5, 0.5, 0.2);
		}
		glFogi(GL_FOG_MODE, GL_EXP2);
		glFogfv(GL_FOG_COLOR, fogColor);
		glFogf(GL_FOG_DENSITY, fogIntensity);
		glHint(GL_FOG_HINT, GL_DONT_CARE);
		glFogf(GL_FOG_START, 1.0f);
		glFogf(GL_FOG_END, 50.0f);
		glEnable(GL_FOG);
		glFogi(GL_FOG_MODE, GL_EXP2);
	}

	void addFog() {
		fogIntensity += 0.01;
	}
	void removeFog() {
		//fogIntensity -= 0.01;
		fogIntensity = 0.0;
	}




};