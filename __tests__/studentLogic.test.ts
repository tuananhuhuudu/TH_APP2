import {getClassification} from '../src/utils/classification';
import {
  EMPTY_FORM,
  formToStudent,
  hasErrors,
  validateStudentForm,
} from '../src/utils/validation';

describe('getClassification', () => {
  it('xếp loại đúng theo các mốc GPA', () => {
    expect(getClassification(10)).toBe('Giỏi');
    expect(getClassification(8.5)).toBe('Giỏi');
    expect(getClassification(8.49)).toBe('Khá');
    expect(getClassification(7.0)).toBe('Khá');
    expect(getClassification(6.99)).toBe('Trung bình');
    expect(getClassification(5.0)).toBe('Trung bình');
    expect(getClassification(4.99)).toBe('Yếu');
    expect(getClassification(0)).toBe('Yếu');
  });
});

const VALID_FORM = {
  id: 'B23CC999',
  fullName: 'Nguyễn Văn A',
  birthday: '29/02/2024',
  gender: 'Nam',
  email: 'a@stu.ptit.edu.vn',
  phone: '0912345678',
  className: 'D23CQCC04-B',
  faculty: 'Công nghệ thông tin',
  gpa: '8,5',
};

describe('validateStudentForm', () => {
  it('chấp nhận dữ liệu hợp lệ', () => {
    expect(hasErrors(validateStudentForm(VALID_FORM, []))).toBe(false);
  });

  it('báo lỗi khi bỏ trống toàn bộ', () => {
    const errors = validateStudentForm({...EMPTY_FORM, gender: ''}, []);
    expect(Object.keys(errors)).toHaveLength(9);
  });

  it('chặn mã sinh viên trùng', () => {
    const errors = validateStudentForm(VALID_FORM, ['b23cc999']);
    expect(errors.id).toBeDefined();
  });

  it('bỏ qua chính nó khi chỉnh sửa', () => {
    const errors = validateStudentForm(VALID_FORM, ['B23CC999'], 'B23CC999');
    expect(errors.id).toBeUndefined();
  });

  it('từ chối ngày không tồn tại', () => {
    expect(
      validateStudentForm({...VALID_FORM, birthday: '31/02/2005'}, []).birthday,
    ).toBeDefined();
    expect(
      validateStudentForm({...VALID_FORM, birthday: '29/02/2023'}, []).birthday,
    ).toBeDefined();
  });

  it('từ chối GPA ngoài khoảng 0 - 10', () => {
    expect(validateStudentForm({...VALID_FORM, gpa: '10.5'}, []).gpa).toBeDefined();
    expect(validateStudentForm({...VALID_FORM, gpa: '-1'}, []).gpa).toBeDefined();
    expect(validateStudentForm({...VALID_FORM, gpa: 'abc'}, []).gpa).toBeDefined();
  });

  it('từ chối email và số điện thoại sai định dạng', () => {
    expect(validateStudentForm({...VALID_FORM, email: 'abc'}, []).email).toBeDefined();
    expect(validateStudentForm({...VALID_FORM, phone: '123'}, []).phone).toBeDefined();
    expect(
      validateStudentForm({...VALID_FORM, phone: '1912345678'}, []).phone,
    ).toBeDefined();
  });
});

describe('formToStudent', () => {
  it('chuẩn hoá khoảng trắng và dấu phẩy thập phân', () => {
    const student = formToStudent({...VALID_FORM, fullName: '  Trần B  '});
    expect(student.fullName).toBe('Trần B');
    expect(student.gpa).toBe(8.5);
  });
});
