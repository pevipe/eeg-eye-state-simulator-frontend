# EegEyeStateSimulator - frontend
## Description
This repository corresponds to the frontend of the simulator of a control system based on EEG
signals associated to open and closed eye states. Its backend can be found on [this 
repository](https://github.com/pevipe/eeg-eye-state-simulator-backend).

Both are part of the End-of-Degree Project of the Degree in Computer Engineering by Pelayo Vieites
Pérez, from the University of A Coruña. 

![ui-main](https://github.com/user-attachments/assets/516ff235-e933-4e0b-a78d-e1ac6a3c2d7c)


## Requirements
- Node 18.

- (Optional) Docker.

## Run the project
The first time, `npm install` must be executed in the application directory (`eeg-eye-state-simulator`)
to install the necessary dependencies.

### Configure the URL of the backend's API
If the API is started in an URL different from `http://localhost:8000/classifiers`, it must be changed in
the environment of the application, found at `src/environments/environment.ts`:
```TypeScript
export const environment = {
    classifiersApiUrl: 'http://localhost:8000/classifiers', // MODIFY THIS
    //...
}
```

### Configure Telegram notification service with detected eye state change
This simulator is able to send a notification in each change of the eye state when running a simulation
in the timeline component. This service can be configured directly in the frontend of the application,
after training an algorithm, selecting that option in the simulation component. The parameters to be
provided are the Telegram bot token and chat ID ([Telegram documentation here](https://core.telegram.org/bots/)).

![ui-telegram-config](https://github.com/pevipe/TFG_frontend/assets/80844047/f77ae9db-f67f-4353-b932-cb214a58c047)


However, for a persistent configuration, bot token and chat ID must be set in the environment of the
application (in `src/environments/environment.ts`):
```TypeScript
export const environment = {
    //...
    telegramBotToken: 'YOUR-TOKEN-HERE',
    telegramChatId: 'YOUR-CHATID-HERE',
}
```

### Start development server

From the application directory (`eeg-eye-state-simulator`), running `ng serve` will start the application
in `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Build a Docker image
To make it easier to start the server in different environments, a Dockerfile is provided, and it can be used
to easily generate a Docker image.

In this case, the configuration of the environment of the application (backend's API URL and, optionally,
Telegram parameters) can be established in the file `docker/environment.ts`, as this will be the one used
by the container.

After so, to build the Docker image simply run `docker build -t <image_name:latest> .` from the root 
directory of the project.

> **NOTE**: Make sure not to have the folder `node_modules` generated in the directory `eeg-eye-simulator`
before executing the command. Otherwise, it will be fully copied and the build will be unefficient.

### Run the Docker image
Once the image has been built, it can be run with `docker run -p 80:80 <image_name:latest>`, and the application
will be available at `http://localhost:80`.

Note that, for it to work properly, the image with the backend of the application (available 
[here](https://github.com/pevipe/eeg-eye-state-simulator-backend)) must also be built and running.
