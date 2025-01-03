import examQuestions from './questionsData.js';
import Exam from './exam.js';

const exam = new Exam(examQuestions);
exam.start();

