import {Classification} from '../types/student';

export function getClassification(gpa: number): Classification {
  if (gpa >= 8.5) {
    return 'Giỏi';
  }
  if (gpa >= 7.0) {
    return 'Khá';
  }
  if (gpa >= 5.0) {
    return 'Trung bình';
  }
  return 'Yếu';
}

export const CLASSIFICATION_COLORS: Record<
  Classification,
  {bg: string; text: string}
> = {
  'Giỏi': {bg: '#DCFCE7', text: '#15803D'},
  'Khá': {bg: '#DBEAFE', text: '#1D4ED8'},
  'Trung bình': {bg: '#FEF3C7', text: '#B45309'},
  'Yếu': {bg: '#FEE2E2', text: '#B91C1C'},
};
