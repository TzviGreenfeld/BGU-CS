const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { token } = req.body;
  try {
    // Verify the token using the same SECRET used during token signing
    const decodedToken = jwt.verify(token, process.env.SECRET);

    // Fetch the user based on the decoded token
    const user = await prisma.user.findFirst({
      where: { id: decodedToken.id },
    });

    // Return the user if found
    res.status(200).json({ user: user });
  } catch (error) {
    // Return null if token is invalid or any other error occurs
    console.log("tokenError:", token);
    res.status(200).json({ user: null });
  }
}
