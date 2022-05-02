# ⚡️ Setup

## Database installation

The Project requires both a `MySQL database` and a `MongoDB database`.
This needs to be installed separately before the Project can be started.

## Setup:

```bash
# Clone the repo:
git clone https://github.com/linusromland-ITHS/Backendprogrammering-och-Databaser-Grupprojektet.git

# Navigate to folder:
cd Backendprogrammering-och-Databaser-Grupprojektet/
```

### Frontend

Next, you need to build the **frontend**. To do this, run the following in the terminal or Command Prompt:

```bash
# Navigate to frontend folder:
cd frontend/

# Install necessary dependencies:
npm install

# Build the frontend
npm run build
```

### Backend

Then you need to install the necessary dependencies for the **backend**. To do this, run the following in the terminal or Command Prompt:

```bash
# Navigate to backend folder:
cd ../backend/

# Install necessary dependencies:
npm install
```

Before you can start the server, you need to setup your environment variables.

```bash
# Create a file called.env.
touch .env
```

Then, you need to add the following lines to the file:

```bash
MYSQLUSER=MYSQL_USERNAME
MYSQLPASS=MYSQL_PASSWORD
MYSQLDB=MYSQL_DATABASE_NAME
MONGODB=MONGODB_DATABASE_NAME
```

_Note_: The variables are case sensitive.

None of the variables are required. If you don't specify them, the Project will use the default values.

### Starting the server

Finally, you can start the server using the following command:

```bash
npm run start
```

That's all you need to know to start! 🎉
