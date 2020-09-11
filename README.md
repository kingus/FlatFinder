# FlatFinder - still in progress 🌱

## What is FlatFinder?
It's a simple web app that'll help you find the apartament of your dreams.

## How it works?
FlatFinder uses web scraping to get data from gumtree.pl and otodom.pl to get offers that'll interest you.
The backend of the application is built in Django(Python).
The frontend is developed in React JS. 

## How does it look like?

### Login page
![alt text](https://github.com/kingus/FlatFinder/blob/develop/screens/flatfinder_screen1)

### Register page
![alt text](https://github.com/kingus/FlatFinder/blob/develop/screens/flatfinder_screen2.png)

### Activate account
![alt text](https://github.com/kingus/FlatFinder/blob/develop/screens/flatfinder_screen5.png)

### Apartaments
![alt text](https://github.com/kingus/FlatFinder/blob/develop/screens/flatfinder_screen3.png)


###### Photo used in the app was found on https://pl.pinterest.com/pin/580119995733039610 

## How to run the application?
### Backend
0. Set environmental variables on your operating system:
    * MA_SECRET_KEY - key to the Django project
1. Go to the backend directory
2. Create virtualenv using venv
``` 
python3 -m venv ma_venv
```
3. Activate virtualenv
``` 
source ma_venv/bin/activate
```
4. Upgrate pip (optional)
``` 
python3 -m pip install --upgrade pip
```
5. Install required packages
``` 
pip install -r requirements.txt
```
6. Make migrations and migrate
``` 
python manage.py makemigrations && python manage.py migrate
```
7. Run the server
``` 
python manage.py runserver
```
### Frontend
0. Go to frontend directory
1. Run your server file
``` 
npm start
``` 

