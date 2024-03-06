FROM  python:3.11-alpine

WORKDIR /backend

# copy from the current directory of the Dockerfile to /backend in the image
COPY . . 

RUN pip install -r requirements.txt

EXPOSE 8000
CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]