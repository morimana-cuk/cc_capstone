link cloud run:<br>
https://capstone-sv67gbtaea-et.a.run.app<br>

setalah di clone atau di pull<br>
npm install dulu(khusus fresh project)<br>
baru npm start<br>

jangan lupa DB harus sudah tersedia<br>
db name = capstone<br>

route get all data filter<br>
/laporan/filter/{type}/{value}<br>
type ini isi nya kota, desa, kecamatan<br>
value nama wilayah<br>
contoh<br>
http://localhost:3000/laporan/filter/kota/jakarta<br>
http://localhost:3000/laporan/filter/desa/nama_desa<br>
http://localhost:3000/laporan/filter/kecamatan/nama_kecamatan<br>

route get all data<br>
http://localhost:3000/laporan/all<br>

route upload gambar<br>
http://localhost:3000/upload<br>

route login<br>
http://localhost:3000/login<br>

route register<br>
http://localhost:3000/register<br>

route update password<br>
http://localhost:3000/update_password<br>

pake laragon kalo mau enak<br>
