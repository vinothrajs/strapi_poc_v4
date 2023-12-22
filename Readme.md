## To run DB
cd db
docker-compose up -d

## dev db 
db name :  erp_dev
db user :  admin
db pass :  Admin@123!

## db pgadmin
http://localhost:8085/
admin@test.com
Admin@123!

## To run backend api
cd backend
npm install
npm run develop
http://localhost:1337/admin
admin@test.com
Admin@123!

## To install k6 for testing (please refer below link)
ref : https://grafana.com/docs/k6/latest/get-started/installation/

## To run fastapi for k6 testing
cd fastapi
python -m venv env
env/Scripts/activate
pip install -r requirements.txt
uvicorn main:app --reload 

