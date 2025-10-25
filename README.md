<img width="1100" height="434" alt="image" src="https://github.com/user-attachments/assets/21b6b12f-8c9d-4444-8a2e-ba0ae1a3dcff" /># Thông tin cá nhân:
### Họ và tên: Nguyễn Văn Thứ   
### MSSV: K225480106062   
### Lớp: K58KTP
# <p align="center">BÀI TẬP 2 MÔN : PHÁT TRIỂN ỨNG DỤNG TRÊN NỀN WEB</p>
## NỘI DUNG BÀI TẬP:
2.1. Cài đặt Apache web server:
- Vô hiệu hoá IIS: nếu iis đang chạy thì mở cmd quyền admin để chạy lệnh: iisreset /stop
- Download apache server, giải nén ra ổ D, cấu hình các file:
  + D:\Apache24\conf\httpd.conf
  + D:Apache24\conf\extra\httpd-vhosts.conf
  để tạo website với domain: fullname.com
  code web sẽ đặt tại thư mục: `D:\Apache24\fullname` (fullname ko dấu, liền nhau)
- sử dụng file `c:\WINDOWS\SYSTEM32\Drivers\etc\hosts` để fake ip 127.0.0.1 cho domain này
  ví dụ sv tên là: `Đỗ Duy Cốp` thì tạo website với domain là fullname ko dấu, liền nhau: `doduycop.com`
- thao tác dòng lệnh trên file `D:\Apache24\bin\httpd.exe` với các tham số `-k install` và `-k start` để cài đặt và khởi động web server apache.

2.2. Cài đặt nodejs và nodered => Dùng làm backend:
- Cài đặt nodejs:
  + download file `https://nodejs.org/dist/v20.19.5/node-v20.19.5-x64.msi`  (đây ko phải bản mới nhất, nhưng ổn định)
  + cài đặt vào thư mục `D:\nodejs`
- Cài đặt nodered:
  + chạy cmd, vào thư mục `D:\nodejs`, chạy lệnh `npm install -g --unsafe-perm node-red --prefix "D:\nodejs\nodered"`
  + download file: https://nssm.cc/release/nssm-2.24.zip
    giải nén được file nssm.exe
    copy nssm.exe vào thư mục `D:\nodejs\nodered\`
  + tạo file "D:\nodejs\nodered\run-nodered.cmd" với nội dung (5 dòng sau):
@echo off
REM fix path
set PATH=D:\nodejs;%PATH%
REM Run Node-RED
node "D:\nodejs\nodered\node_modules\node-red\red.js" -u "D:\nodejs\nodered\work" %*
  + mở cmd, chuyển đến thư mục: `D:\nodejs\nodered`
  + cài đặt service `a1-nodered` bằng lệnh: nssm.exe install a1-nodered "D:\nodejs\nodered\run-nodered.cmd"
  + chạy service `a1-nodered` bằng lệnh: `nssm start a1-nodered`

2.3. Tạo csdl tuỳ ý trên mssql (sql server 2022), nhớ các thông số kết nối: ip, port, username, password, db_name, table_name

2.4. Cài đặt thư viện trên nodered:
- truy cập giao diện nodered bằng url: http://localhost:1880
- cài đặt các thư viện: node-red-contrib-mssql-plus, node-red-node-mysql, node-red-contrib-telegrambot, node-red-contrib-moment, node-red-contrib-influxdb, node-red-contrib-duckdns, node-red-contrib-cron-plus
- Sửa file `D:\nodejs\nodered\work\settings.js` : 
  tìm đến chỗ adminAuth, bỏ comment # ở đầu dòng (8 dòng), thay chuỗi mã hoá mật khẩu bằng chuỗi mới
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "chuỗi_mã_hoá_mật_khẩu",
            permissions: "*"
        }]
    },   
   với mã hoá mật khẩu có thể thiết lập bằng tool: https://tms.tnut.edu.vn/pw.php
- chạy lại nodered bằng cách: mở cmd, vào thư mục `D:\nodejs\nodered` và chạy lệnh `nssm restart a1-nodered`
  khi đó nodered sẽ yêu cầu nhập mật khẩu mới vào được giao diện cho admin tại: http://localhost:1880

2.5. tạo api back-end bằng nodered:
- tại flow1 trên nodered, sử dụng node `http in` và `http response` để tạo api
- thêm node `MSSQL` để truy vấn tới cơ sở dữ liệu
- logic flow sẽ gồm 4 node theo thứ tự sau (thứ tự nối dây): 
  1. http in  : dùng GET cho đơn giản, URL đặt tuỳ ý, ví dụ: /timkiem
  2. function : để tiền xử lý dữ liệu gửi đến
  3. MSSQL: để truy vấn dữ liệu tới CSDL, nhận tham số từ node tiền xử lý
  4. http response: để phản hồi dữ liệu về client: Status Code=200, Header add : Content-Type = application/json
  có thể thêm node `debug` để quan sát giá trị trung gian.
- test api thông qua trình duyệt, ví dụ: http://localhost:1880/timkiem?q=thị

2.6. Tạo giao diện front-end:
- html form gồm các file : index.html, fullname.js, fullname.css
  cả 3 file này đặt trong thư mục: `D:\Apache24\fullname`
  nhớ thay fullname là tên của bạn, viết liền, ko dấu, chữ thường, vd tên là Đỗ Duy Cốp thì fullname là `doduycop`
  khi đó 3 file sẽ là: index.html, doduycop.js và doduycop.css
- index.html và fullname.css: trang trí tuỳ ý, có dấu ấn cá nhân, có form nhập được thông tin.
- fullname.js: lấy dữ liệu trên form, gửi đến api nodered đã làm ở bước 2.5, nhận về json, dùng json trả về để tạo giao diện phù hợp với kết quả truy vấn của bạn.

2.7. Nhận xét bài làm của mình:
- đã hiểu quá trình cài đặt các phần mềm và các thư viện như nào?
- đã hiểu cách sử dụng nodered để tạo api back-end như nào?
- đã hiểu cách frond-end tương tác với back-end ra sao?
## GHI CHÚ:
1. yêu cầu trên cài đặt trên ổ D, nếu máy ko có ổ D có thể linh hoạt chuyển sang ổ khác, path khác.
2. có thể thực hiện trực tiếp trên máy tính windows, hoặc máy ảo
3. vì csdl là tuỳ ý: sv cần mô tả rõ db chứa dữ liệu gì, nhập nhiều dữ liệu test có nghĩa, json trả về sẽ có dạng như nào cũng cần mô tả rõ.
4. có thể xây dựng nhiều API cùng cơ chế, khác tính năng: như tìm kiếm, thêm, sửa, xoá dữ liệu trong DB.
5. bài làm phải có dấu ấn cá nhân, nghiêm cấm mọi hình thức sao chép, gian lận (sẽ cấm thi nếu bị phát hiện gian lận).
6. bài tập thực làm sẽ tốn nhiều thời gian, sv cần chứng minh quá trình làm: save file readme.md mỗi khoảng 15-30 phút làm : lịch sử sửa đổi sẽ thấy quá trình làm này!
7. nhắc nhẹ: github ko fake datetime được.
8. sv được sử dụng AI để tham khảo.

# <p align="center">BÀI LÀM</p>
### 2.1. Cài đặt Apache web server:
#### 1. Vô hiệu hoá IIS: 
Nếu IIS đang chạy thì mở Command Prompt Run as Administrator để chạy lệnh: `iisreset /stop`
<img width="1105" height="273" alt="Ảnh chụp màn hình 2025-10-25 092101" src="https://github.com/user-attachments/assets/a0124a90-d6b3-401f-8432-f68d41ff16f8" />
➡️ Kết quả đã vô hiệu hóa IIS thành công ✅

#### 2. Download apache server, giải nén ra ổ D, cấu hình các file:

Truy cập trang chính thức (Windows build): ➡️ https://www.apachelounge.com/download/ Tải phiên bản mới nhất
<img width="1091" height="372" alt="Ảnh chụp màn hình 2025-10-25 093113" src="https://github.com/user-attachments/assets/49aaaf95-787f-4ca0-b105-dc26ed88101f" />
Giải nén File Zip ra ổ E.
<img width="1917" height="1015" alt="Ảnh chụp màn hình 2025-10-25 093302" src="https://github.com/user-attachments/assets/3a9bb032-57a1-429a-b663-d7ed386afb73" />
Mở theo đường dẫn E:\Apache24\conf\httpd.conf để sửa:
- Bật cấu hình VirtualHost tìm dòng: `#Include conf/extra/httpd-vhosts.conf` ➡️ Bỏ dấu # đi để Apache nạp file vhost
- Đặt ServerName mặc định tìm và thêm (hoặc sửa): `ServerName localhost:80`
- Đảm bảo có dòng DirectoryIndex: `DirectoryIndex index.html index.php`

Mở theo đường dẫn E:Apache24\conf\extra\httpd-vhosts.conf 
- Xóa bỏ nội dung cũ và thêm nôi dung mới như sau  lưu file:
```
# Virtual Host cho nguyenvanthu.com
<VirtualHost *:80>
    ServerAdmin webmaster@nguyenvanthu.com
    DocumentRoot "D:/Apache24/nguyenvanthu"
    ServerName nguyenvanthu.com
    ServerAlias www.nguyenvanthu.com
    ErrorLog "logs/nguyenvanthu-error.log"
    CustomLog "logs/nguyenvanthu-access.log" common

    <Directory "D:/Apache24/nguyenvanthu">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```
Tạo thư mục web & file test
- Tạo thư mục: E:\Apache24\nguyenvanthu
- Tạo file index.html với nội
```<!DOCTYPE html>
<html>
<head><title>Website nguyenvanthu.com</title></head>
<body>
<h1>Chao mung den voi website nguyenvanthu.com!</h1>
</body>
</html>
```
Cấu hình file hosts trong Windows
- Mở file: `C:\Windows\System32\drivers\etc\hosts` bằng Notepad với quyền Administrator. Thêm 2 dòng sau vào cuối file Hosts để Fake Domain: `127.0.0.1   nguyenvanthu.com` & `127.0.0.1   www.nguyenvanthu.com` ➡️ Sau đó Lưu lại✅
<img width="1172" height="733" alt="Ảnh chụp màn hình 2025-10-25 113740" src="https://github.com/user-attachments/assets/d6612c7c-315b-4473-bca9-681eec95c93e" />

- Sau đó mở CMD (Run as Administrator) gõ `ping nguyenvanthu.com` kết quả thông như hình
<img width="1102" height="611" alt="Ảnh chụp màn hình 2025-10-25 113300" src="https://github.com/user-attachments/assets/be02fa66-281a-455f-9464-6c4f2cb76a6d" />

- Khởi động lại Apache mở CMD (Run as Administrator) và chạy lần lượt các lệnh sau: `cd D:\Apache24\bin` & `httpd -k restart` 
<img width="1103" height="136" alt="Ảnh chụp màn hình 2025-10-25 113333" src="https://github.com/user-attachments/assets/e786af34-f550-4c98-8db1-f56684f6d89e" />

- Kiểm tra hoạt động mở trình duyệt và truy cập: ➡️ http://nguyenvanthu.com. Nếu thấy hiện dòng “Chao mung den voi website nguyenvanthu.com!”, nghĩa là bạn đã cấu hình thành công ✅
<img width="1918" height="372" alt="Ảnh chụp màn hình 2025-10-25 111910" src="https://github.com/user-attachments/assets/ec939777-9d57-430a-8726-db567aeba49b" />

### 2.2. Cài đặt nodejs và nodered => Dùng làm backend:
#### 1. Cài đặt nodejs:
Download bản Node.js ổn định qua file sau: `https://nodejs.org/dist/v20.19.5/node-v20.19.5-x64.msi.` Cài đặt vào thư mục `E:\nodejs` như hình:
<img width="1915" height="931" alt="Ảnh chụp màn hình 2025-10-25 120255" src="https://github.com/user-attachments/assets/c7eec382-86a1-4598-8ba6-819fdd8b284d" />

Kiểm tra cài đặt nodes thành công ✅ với các version như hình:
<img width="1101" height="268" alt="Ảnh chụp màn hình 2025-10-25 120545" src="https://github.com/user-attachments/assets/f6f30c45-bc06-4d71-8a73-3ed4e9dac1f9" />
#### 2. Cài đặt nodered:
Chạy CMD (Run as Administrator), di chuyển vào thư mục `E:\nodejs`, chạy lệnh `npm install -g --unsafe-perm node-red --prefix "E:\nodejs\nodered"` để tiến hành cài đặt
<img width="1100" height="439" alt="Ảnh chụp màn hình 2025-10-25 121400" src="https://github.com/user-attachments/assets/44fd8854-c806-4a28-9726-89488d328dc0" />
➡️Cài đặt thành công ✅
#### 3. Cài NSSM (dùng để tạo Service windows)
Download file: `https://nssm.cc/release/nssm-2.24.zip` ➡️ giải nén được file `nssm.exe` ➡️ copy `nssm.exe` vào thư mục `E:\nodejs\nodered\`
<img width="1918" height="507" alt="Ảnh chụp màn hình 2025-10-25 122642" src="https://github.com/user-attachments/assets/3caf6fc1-5a27-4e2b-bb7a-1c7a06c0acad" />
Tạo file `"E:\nodejs\nodered\run-nodered.cmd"` với nội dung (5 dòng sau):
```
@echo off
REM fix path
set PATH=D:\nodejs;%PATH%
REM Run Node-RED
node "E:\nodejs\nodered\node_modules\node-red\red.js" -u "E:\nodejs\nodered\work" %*
```
<img width="1917" height="652" alt="Ảnh chụp màn hình 2025-10-25 124009" src="https://github.com/user-attachments/assets/b5adceaf-f61c-4805-b276-c4b656e3233b" />
Mở cmd, chuyển đến thư mục: `E:\nodejs\nodered`
<img width="1100" height="434" alt="Ảnh chụp màn hình 2025-10-25 124244" src="https://github.com/user-attachments/assets/a0c9d9a3-a484-4c08-84d4-f015d58b4877" />

Cài đặt service `a1-nodered` bằng lệnh: nssm.exe install a1-nodered "E:\nodejs\nodered\run-nodered.cmd"
Chạy service `a1-nodered` bằng lệnh: `nssm start a1-nodered`
<img width="1097" height="317" alt="Ảnh chụp màn hình 2025-10-25 124112" src="https://github.com/user-attachments/assets/e5230422-cdde-49b0-8b72-6020a3fee880" />
➡️Cài đặt thành công✅
### 2.3. Tạo csdl tuỳ ý trên mssql (sql server 2022), nhớ các thông số kết nối: ip, port, username, password, db_name, table_name

### 2.4. Cài đặt thư viện trên nodered:
truy cập giao diện nodered bằng url: http://localhost:1880
cài đặt các thư viện: node-red-contrib-mssql-plus, node-red-node-mysql, node-red-contrib-telegrambot, node-red-contrib-moment, node-red-contrib-influxdb, node-red-contrib-duckdns, node-red-contrib-cron-plus
Sửa file D:\nodejs\nodered\work\settings.js : tìm đến chỗ adminAuth, bỏ comment # ở đầu dòng (8 dòng), thay chuỗi mã hoá mật khẩu bằng chuỗi mới
adminAuth: {
      type: "credentials",
      users: [{
          username: "admin",
          password: "chuỗi_mã_hoá_mật_khẩu",
          permissions: "*"
      }]
  },
với mã hoá mật khẩu có thể thiết lập bằng tool: https://tms.tnut.edu.vn/pw.php
chạy lại nodered bằng cách: mở cmd, vào thư mục D:\nodejs\nodered và chạy lệnh nssm restart a1-nodered khi đó nodered sẽ yêu cầu nhập mật khẩu mới vào được giao diện cho admin tại: http://localhost:1880

### 2.5. tạo api back-end bằng nodered:
tại flow1 trên nodered, sử dụng node http in và http response để tạo api
thêm node MSSQL để truy vấn tới cơ sở dữ liệu
logic flow sẽ gồm 4 node theo thứ tự sau (thứ tự nối dây):
http in : dùng GET cho đơn giản, URL đặt tuỳ ý, ví dụ: /timkiem
function : để tiền xử lý dữ liệu gửi đến
MSSQL: để truy vấn dữ liệu tới CSDL, nhận tham số từ node tiền xử lý
http response: để phản hồi dữ liệu về client: Status Code=200, Header add : Content-Type = application/json có thể thêm node debug để quan sát giá trị trung gian.
test api thông qua trình duyệt, ví dụ: http://localhost:1880/timkiem?q=thị

### 2.6. Tạo giao diện front-end:
html form gồm các file : index.html, fullname.js, fullname.css cả 3 file này đặt trong thư mục: D:\Apache24\fullname nhớ thay fullname là tên của bạn, viết liền, ko dấu, chữ thường, vd tên là Đỗ Duy Cốp thì fullname là doduycop khi đó 3 file sẽ là: index.html, doduycop.js và doduycop.css
index.html và fullname.css: trang trí tuỳ ý, có dấu ấn cá nhân, có form nhập được thông tin.
fullname.js: lấy dữ liệu trên form, gửi đến api nodered đã làm ở bước 2.5, nhận về json, dùng json trả về để tạo giao diện phù hợp với kết quả truy vấn của bạn.

### 2.7. Nhận xét bài làm của mình:
đã hiểu quá trình cài đặt các phần mềm và các thư viện như nào?
đã hiểu cách sử dụng nodered để tạo api back-end như nào?
đã hiểu cách frond-end tương tác với back-end ra sao?

# <p align="center">*--- THE END ---*</p>
