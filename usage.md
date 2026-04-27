AslTa’lim HR platformani ishlatish (admin uchun)
1. Saytga kirish

Saytga kirish uchun:

https://your-project-name.vercel.app

Bu yerda:

filiallarni ko‘rasiz
vakansiyalarni ko‘rasiz
test qilib ariza topshirib ko‘rishingiz mumkin

❗barcha boshqaruv ishlari saytda emas, Baserow’da qilinadi

2. Baserow (admin panel)

Barcha ma’lumotlar shu yerda:

https://baserow.io

Login qilib kirasiz (sizga berilgan email va parol bilan)

3. Filial qo‘shish

branches tablega kiring

+ New row bosing
quyidagilarni yozing:
name → filial nomi
city → shahar
description → qisqacha izoh
image → rasm link (ixtiyoriy)

Saqlang — shu zahoti saytga chiqadi

4. Vakansiya qo‘shish

positions tablega kiring

+ New row bosing
to‘ldiring:
title → lavozim nomi
department → yo‘nalish (masalan: Ingliz tili)
type → To‘liq stavka / Yarim stavka
salary → maosh
shortDescription → qisqacha izoh
branch → qaysi filialga tegishli (tanlash MUHIM)
is_open → ON bo‘lishi kerak

Saqlang — saytga chiqadi

5. Nomzodlarni ko‘rish

applications tablega kiring

Bu yerda hamma arizalar chiqadi:

ism
telefon
telegram
qaysi filial
qaysi lavozim
6. Status o‘zgartirish

applications ichida status degan field bor

Shuni o‘zgartirasiz:

new
interview
accepted
rejected
7. Tajriba va sertifikatlar

Nomzod haqida qo‘shimcha ma’lumotlar:

experience → ish tajribasi
certificates → sertifikatlar

hammasi application bilan bog‘langan bo‘ladi

8. Email haqida

Agar email sozlangan bo‘lsa:

yangi ariza kelganda emailga xabar boradi

Agar kelmasa:

Baserow ichidan tekshirasiz
9. Muhim narsalar
branch bo‘sh qoldirmang
is_open = true bo‘lmasa vakansiya chiqmaydi
field nomlarini o‘zgartirmang
tablelarni o‘chirib yubormang