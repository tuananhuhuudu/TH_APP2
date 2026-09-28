# Ứng dụng Quản lý sinh viên (React Native)

Bài tập thực hành buổi 2 — ứng dụng quản lý sinh viên gồm 4 màn hình với đầy đủ
chức năng thêm, xem, sửa, xoá và tìm kiếm.

## Chạy ứng dụng

```bash
npm install
npm start          # khởi động Metro
npm run android    # hoặc: npm run ios
```

> Lần đầu chạy sau khi cài `react-native-screens` cần build lại app native
> (`npm run android` / `npm run ios`), không dùng lại bản build cũ.

## Kiểm thử

```bash
npm test           # 10 test cho logic xếp loại và kiểm tra dữ liệu
npm run lint
npx tsc --noEmit
```

## Cấu trúc thư mục

```
App.tsx                       Gốc ứng dụng: SafeAreaProvider + StudentProvider
src/
  types/student.ts            Kiểu Student, StudentForm, Gender, Classification
  data/
    students.ts               Dữ liệu sinh viên mẫu
    StudentContext.tsx        Quản lý danh sách bằng useState, chia sẻ cho 4 màn hình
  navigation/
    types.ts                  Khai báo tham số cho từng route
    RootNavigator.tsx         Native Stack Navigator
  components/                 Các component dùng chung
    AppButton.tsx             Nút bấm (primary / danger / outline)
    SearchBar.tsx             Ô tìm kiếm có nút xoá nhanh
    FormInput.tsx             Ô nhập liệu kèm nhãn và thông báo lỗi
    GenderPicker.tsx          Chọn giới tính bằng nhóm nút
    StudentCard.tsx           Thẻ sinh viên trong FlatList
    ClassificationBadge.tsx   Nhãn xếp loại có màu
    InfoRow.tsx               Dòng "nhãn - giá trị" ở màn chi tiết
    StudentFormView.tsx       Form dùng chung cho màn Thêm và Sửa
  screens/
    StudentListScreen.tsx     Danh sách + tìm kiếm + thống kê
    StudentDetailScreen.tsx   Chi tiết + Chỉnh sửa + Xoá
    AddStudentScreen.tsx      Thêm sinh viên
    EditStudentScreen.tsx     Chỉnh sửa sinh viên
  utils/
    classification.ts         Quy tắc xếp loại theo GPA
    validation.ts             Kiểm tra dữ liệu form
    theme.ts                  Màu sắc, khoảng cách, bo góc
```

## Các màn hình

1. **Danh sách sinh viên** — `FlatList` hiển thị mã sinh viên, họ tên, lớp, GPA và
   xếp loại. Ô tìm kiếm lọc theo mã hoặc họ tên (không phân biệt hoa/thường).
   Nhấn vào một sinh viên để mở màn chi tiết, nhấn nút `+` để thêm mới.
2. **Chi tiết sinh viên** — hiển thị đầy đủ thông tin, kèm nút **Chỉnh sửa** và
   **Xoá** (có hộp thoại xác nhận trước khi xoá).
3. **Thêm sinh viên** — nhập 9 trường thông tin, kiểm tra dữ liệu trước khi thêm.
   Danh sách được cập nhật ngay sau khi thêm thành công.
4. **Chỉnh sửa sinh viên** — nạp sẵn thông tin hiện tại, cho phép cập nhật và
   đồng bộ lại danh sách cũng như màn chi tiết.

## Quy tắc xếp loại

| GPA        | Xếp loại   |
| ---------- | ---------- |
| ≥ 8.5      | Giỏi       |
| ≥ 7.0      | Khá        |
| ≥ 5.0      | Trung bình |
| < 5.0      | Yếu        |

## Kiểm tra dữ liệu đầu vào

- Mã sinh viên: bắt buộc, tối thiểu 3 ký tự, **không được trùng** với mã đã có
  (khi chỉnh sửa thì bỏ qua chính bản ghi đang sửa).
- Họ tên: bắt buộc, tối thiểu 2 ký tự.
- Ngày sinh: định dạng `dd/MM/yyyy` và phải là ngày có thật (ví dụ `31/02/2005`
  và `29/02/2023` đều bị từ chối).
- Giới tính: chọn Nam / Nữ / Khác.
- Email: đúng định dạng email.
- Số điện thoại: 10 chữ số, bắt đầu bằng `0`.
- Lớp, Khoa: bắt buộc.
- GPA: là số trong khoảng 0 - 10, chấp nhận cả dấu `,` lẫn `.` làm dấu thập phân.

Lỗi hiển thị ngay dưới từng ô nhập và tự biến mất khi người dùng sửa lại ô đó.
