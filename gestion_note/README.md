# GestionNote

Ce code a été écrit par Axelle Roy et Emma Rechon-Reguet


## Development server

Afin de lancé l'application, dans un terminal, veuillez effectuer la commande :
    cd gestion_note
Une fois dans le répertoire gestion_note, vous devez noter : 
    npm install (installation des packages nécessaires pour le lancement de l'application)
    ng serve (lancement du server web)

## Mongo server
L'application comprend un lien avec un base de données. Pour l'utiliser, il faut : 
- rejoindre le dossier permettant le lien avec la base de données : 
    cd gestion_note_server
- installer les dépendances nécessaires 
    npm install
- lancer le serveur 
    npm start

Un login.txt est présent dans le fichier gestion_note_server, c'est ce qui vous permet de vous connectez à la base de données mongo.

## Lancer l'application : 
L'application est disponible sur le port : 
http://localhost:4200/

## Pour se connecter
Le service d'inscription n'est pas fonctionnel. Pour ce faire, utiliser un des identifiants et mot de passe créé dans la base de données pour y accéder