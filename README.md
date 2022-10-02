#Student rating

### To install and boot this service you would need the following:
 > Python 3.7.* \
 > Pip3 22.2.*
 
### Pull the dependencies using the following command
```commandline
pip install -r requirements.txt      
```
### Boot it via waitress with the command below
```commandline
waitress-serve --port=80 --call "main:app"
