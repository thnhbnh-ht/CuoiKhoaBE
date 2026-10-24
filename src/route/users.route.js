import { Router } from "express";

const router = Router();

// Route test tạm thời cho users
router.get("/", (req, res) => {
  res.json({ message: "Users route working!" });
});

export default router;