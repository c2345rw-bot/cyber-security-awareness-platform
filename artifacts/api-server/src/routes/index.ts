import { Router, type IRouter } from "express";
import healthRouter from "./health";
import lessonsRouter from "./lessons";
import quizzesRouter from "./quizzes";
import simulatorRouter from "./simulator";
import passwordRouter from "./password";
import scamsRouter from "./scams";
import progressRouter from "./progress";
import leaderboardRouter from "./leaderboard";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(lessonsRouter);
router.use(quizzesRouter);
router.use(simulatorRouter);
router.use(passwordRouter);
router.use(scamsRouter);
router.use(progressRouter);
router.use(leaderboardRouter);
router.use(statsRouter);

export default router;
