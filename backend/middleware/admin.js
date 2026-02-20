function isAdmin(req, res, next) {
  if (req.userData.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
}

export default isAdmin;