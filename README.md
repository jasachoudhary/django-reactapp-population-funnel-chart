# Run app using docker
docker-compose up --build

# Stop running docker app
docker-compose down

# backend api url
http://127.0.0.1:8000/api/population/

# frontend app url
http://localhost:3000

# backend django admin url(username: admin, password: admin)
http://127.0.0.1:8000/admin


## Below Steps to run both frontend and backend app using commands without docker

# 👇️ create virtual environment
python -m venv venv

# 👇️ activate on Windows (cmd.exe)
venv\Scripts\activate.bat

# 👇️ activate on Windows (PowerShell)
venv\Scripts\Activate.ps1

# 👇️ activate on Unix or MacOS
source venv/bin/activate

# 👇️ install django, djangorestframework, django-cors-headers  in the virtual environment
pip install django djangorestframework django-cors-headers



# to run backend app
cd backend
python manage.py runserver

# to run frontend app
cd frontend
npm install
npm start



