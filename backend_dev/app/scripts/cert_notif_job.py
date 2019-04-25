# import datetime

# from django.core.mail import send_mail

# from app.api.models import Hotel

import schedule
import time

def get_dt_string(dt):
	month_text = [
		'Januari',
		'Februari',
		'Maret',
		'April',
		'Mei',
		'Juni',
		'Juli',
		'Agustus',
		'September',
		'Oktober',
		'November',
		'Desember'
	]
	day = dt.day
	month = month_text[dt.month - 1]
	year = dt.year
	return '{} {} {}'.format(day, month, year)

def get_near_expired_hotel():
	import datetime
	from app.api.models import Hotel
	from app.scripts.cert_notif_job import get_dt_string

	now = datetime.datetime.now()
	a_week_from_now = now + datetime.timedelta(days=7)

	near_expired_hotels = Hotel.objects.filter(cert_end__gte=now, cert_end__lte=a_week_from_now)

	temp = []
	for hotel in near_expired_hotels:
		temp.append({
			'id': hotel.id,
		    'name': hotel.name,
		    'district': hotel.district,
		    'address': hotel.address,
		    'star': hotel.star,
		    'owner': hotel.owner,
		    'cert_start': get_dt_string(hotel.cert_start),
		    'cert_end': get_dt_string(hotel.cert_end)
		})
	near_expired_hotels = temp

	return near_expired_hotels

def construct_cert_notif_email_body(near_expired_hotels):
	email_body = 'Halo,\n\n'
	email_body += 'Berikut adalah hotel yang sertifikasinya akan berakhir dalam 7 hari kedepan.'
	for hotel in near_expired_hotels:
		email_body += '\n\n'
		email_body += 'Nama hotel                : {}\n\n'.format(hotel['name'])
		email_body += 'Kabupaten / Kota          : {}\n\n'.format(hotel['district'])
		email_body += 'Alamat                    : {}\n\n'.format(hotel['address'])
		email_body += 'Bintang                   : {}\n\n'.format(hotel['star'])
		email_body += 'Pemilik                   : {}\n\n'.format(hotel['owner'])
		email_body += 'Tanggal akhir sertifikasi : {}\n\n'.format(hotel['cert_end'])
	email_body += '\n\nAtas perhatiannya saya ucapkan terima kasih.'
	return email_body

def check_and_notify_near_expired_hotel():
	print('check_and_notify_near_expired_hotel')
	from django.core.mail import send_mail
	from app.scripts.cert_notif_job import get_near_expired_hotel, construct_cert_notif_email_body

	near_expired_hotels = get_near_expired_hotel()
	if len(near_expired_hotels) > 0:
		email_subject = 'Notifikasi Sertifikasi Hotel Yang Akan Berakhir'
		email_body = construct_cert_notif_email_body(near_expired_hotels)
		recipient_list = ['aahmadizzan@gmail.com']

		send_mail(subject=email_subject,
				message=email_body,
				from_email='sample@mail.com',
				recipient_list=recipient_list,
				fail_silently=False)


check_and_notify_near_expired_hotel()
schedule.every().weeks.do(check_and_notify_near_expired_hotel)
while True:
	schedule.run_pending()
	time.sleep(1)