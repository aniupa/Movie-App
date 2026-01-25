export const isAdmin = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "unauthorized. Admin only" });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Admin middleware error",
    });
  }
};
