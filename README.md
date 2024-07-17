# clone the repo

# Open folder on your code editor and open terminal and run these commands
composer install
npm install

# create a database 
I use PostgreSQL and the database name is on the ENV I included the env.

Once database created open terminal and run this command 

php artisan migrate

once successfully migrated run

npm run dev 

and open a new terminal run 

php artisan serve

# once the app runs, Register an account on the Register button upper right you will redirect to /register once user registered you will redirect to the dashboard and you can now test the customer crud functionalities.

