# Hotel-Disparbud
A simple web app to ease the process of West Java's hotel certification montitoring by West Java Ministry of Touristry.

## How to run (dev mode)
```
pip install -r requirements.txt
python server.py
```

## Structure
* `server.py` - main routing and serving logic
* `templates/` - templatable static html pages (view)
* `controller/` - webapp logic
* `model/` - objects to represent data in database

## Models
* User
  * Stored as `users` table in the database
  * has 3 fields
    * email - primary key
    * password
    * mode - True is for LSU and False is for Disparbud