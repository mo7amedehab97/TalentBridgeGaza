import { Router, Response } from 'express';
import authRoutes from './auth';
// import talentRoutes from './talent';
// import recruiterRoutes from './recruiter'; // add when you build it

const router = Router();

router.use('/auth', authRoutes);
// router.use('/talents', talentRoutes);
// router.use('/recruiters', recruiterRoutes); // example


/**
 * @swagger
 * tags:
 *   - name: Hello
 *     description: Basic test routes
 */

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Hello World route
 *     tags: [Hello]
 *     responses:
 *       200:
 *         description: Returns a hello message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello, Talent Bridge Gaza!
 */
router.get('/hello', (_req, res: Response) => {
  res.json({ message: 'Hello, Talent Bridge Gaza!' });
});

export default router;
