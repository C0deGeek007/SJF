To start Backend run ensure that sysstem has docker installed and use the following command

    sudo docker-compose up --build

    This command will start backend server, redis, and celery. it will also applies all the migrations

To start Frontend follow mentioned steps

1. npm install
2. npm start

To start frontend application open following link in browser after FE server starts (http://localhost:3000/)

How SJF is working

1. In the backend I have used celery to mimic SJF and executed the task with smallest burst time/ duration from the given task list in db till all the task in db have "completed" state
2. if all the task is completed then celery shared task only begins process when a new job comes in.
3. when the task status is updated then updates are sent as a message using django channels/web sockets
4. In frontend i have connected to ws that BE opens up to get update in real time

For Demo working of the application you can see the video attached. 
