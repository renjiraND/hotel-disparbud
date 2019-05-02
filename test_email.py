import smtplib
from apscheduler.schedulers.background import BackgroundScheduler
import time

def send_notif():
    print("Yeet, sending email...")
    fromaddr = 'senapatidiwangkara@gmail.com'
    toaddrs  = 'diw4ngs@gmail.com'
    msg = 'Hotel kadaluarsa minggu ini: Novotel, Santika...'
    username = 'senapatidiwangkara@gmail.com'
    password = "secretdong"
    server = smtplib.SMTP('smtp.gmail.com:587')
    server.ehlo()
    server.starttls()
    server.login(username,password)
    server.sendmail(fromaddr, toaddrs, msg)
    server.quit()

# scheduler = BackgroundScheduler()
# scheduler.add_job(send_notif, 'cron', minute='*/10')
# scheduler.start()

# while True:
    # time.sleep(2)