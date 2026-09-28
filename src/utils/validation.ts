import {Student, StudentForm, StudentFormErrors} from '../types/student';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^0\d{9}$/;
const DATE_RE = /^(\d{2})\/(\d{2})\/(\d{4})$/;

export const EMPTY_FORM: StudentForm = {
  id: '',
  fullName: '',
  birthday: '',
  gender: 'Nam',
  email: '',
  phone: '',
  className: '',
  faculty: '',
  gpa: '',
};

function isValidDate(value: string): boolean {
  const matched = DATE_RE.exec(value);
  if (!matched) {
    return false;
  }
  const day = Number(matched[1]);
  const month = Number(matched[2]);
  const year = Number(matched[3]);
  if (month < 1 || month > 12 || year < 1900) {
    return false;
  }
  const daysInMonth = new Date(year, month, 0).getDate();
  return day >= 1 && day <= daysInMonth;
}

export function validateStudentForm(
  form: StudentForm,
  existingIds: string[],
  currentId?: string,
): StudentFormErrors {
  const errors: StudentFormErrors = {};

  const id = form.id.trim();
  if (!id) {
    errors.id = 'Vui lòng nhập mã sinh viên';
  } else if (id.length < 3) {
    errors.id = 'Mã sinh viên phải có ít nhất 3 ký tự';
  } else if (
    existingIds.some(
      item =>
        item.toLowerCase() === id.toLowerCase() &&
        item.toLowerCase() !== currentId?.toLowerCase(),
    )
  ) {
    errors.id = 'Mã sinh viên đã tồn tại';
  }

  const fullName = form.fullName.trim();
  if (!fullName) {
    errors.fullName = 'Vui lòng nhập họ tên';
  } else if (fullName.length < 2) {
    errors.fullName = 'Họ tên quá ngắn';
  }

  if (!form.birthday.trim()) {
    errors.birthday = 'Vui lòng nhập ngày sinh';
  } else if (!isValidDate(form.birthday.trim())) {
    errors.birthday = 'Ngày sinh không hợp lệ (dd/MM/yyyy)';
  }

  if (!form.gender.trim()) {
    errors.gender = 'Vui lòng chọn giới tính';
  }

  const email = form.email.trim();
  if (!email) {
    errors.email = 'Vui lòng nhập email';
  } else if (!EMAIL_RE.test(email)) {
    errors.email = 'Email không đúng định dạng';
  }

  const phone = form.phone.trim();
  if (!phone) {
    errors.phone = 'Vui lòng nhập số điện thoại';
  } else if (!PHONE_RE.test(phone)) {
    errors.phone = 'Số điện thoại gồm 10 số và bắt đầu bằng 0';
  }

  if (!form.className.trim()) {
    errors.className = 'Vui lòng nhập lớp';
  }

  if (!form.faculty.trim()) {
    errors.faculty = 'Vui lòng nhập khoa';
  }

  const rawGpa = form.gpa.trim().replace(',', '.');
  if (!rawGpa) {
    errors.gpa = 'Vui lòng nhập GPA';
  } else {
    const gpa = Number(rawGpa);
    if (Number.isNaN(gpa)) {
      errors.gpa = 'GPA phải là số';
    } else if (gpa < 0 || gpa > 10) {
      errors.gpa = 'GPA nằm trong khoảng 0 - 10';
    }
  }

  return errors;
}

export function hasErrors(errors: StudentFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function formToStudent(form: StudentForm): Student {
  return {
    id: form.id.trim(),
    fullName: form.fullName.trim(),
    birthday: form.birthday.trim(),
    gender: form.gender.trim() as Student['gender'],
    email: form.email.trim(),
    phone: form.phone.trim(),
    className: form.className.trim(),
    faculty: form.faculty.trim(),
    gpa: Number(form.gpa.trim().replace(',', '.')),
  };
}

export function studentToForm(student: Student): StudentForm {
  return {
    id: student.id,
    fullName: student.fullName,
    birthday: student.birthday,
    gender: student.gender,
    email: student.email,
    phone: student.phone,
    className: student.className,
    faculty: student.faculty,
    gpa: String(student.gpa),
  };
}
