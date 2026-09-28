export type Gender = 'Nam' | 'Nữ' | 'Khác';

export type Classification = 'Giỏi' | 'Khá' | 'Trung bình' | 'Yếu';

export interface Student {
  id: string;
  fullName: string;
  birthday: string; // dd/MM/yyyy
  gender: Gender;
  email: string;
  phone: string;
  className: string;
  faculty: string;
  gpa: number;
}

export type StudentForm = {
  [K in keyof Student]: string;
};

export type StudentFormErrors = Partial<Record<keyof StudentForm, string>>;
