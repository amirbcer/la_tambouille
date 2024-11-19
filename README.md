# La Tambouille

## Liens utiles

### Demo App

https://la-tambouille.fly.dev

### Tableau Trello du projet

https://trello.com/b/fgqgG5HS/la-tambouille

### Collection Postman

[Lien vers la collection](docs/postman/La%20Tambouille.postman_collection.json)

## Installation (dev local)

### Backend

Pour démarrer l'application avec Docker :

```sh
docker compose up --build
```

L'API tourne sur le port `localhost:3000`.

### Frontend

Pour démarrer le front avec React et Vite :

```sh
cd client && npm run dev
```

Le front tourne sur le port `localhost:5173`.

## Récits utilisateurs (user stories)

1.  En tant que visiteur, je veux voir la liste des recettes disponibles.

    **Scenario** : Voir la liste des recettes publiques

        Étant donné que je suis un visiteur
        Lorsque je vais sur la liste des recettes
        Alors je vois toutes les recettes disponibles publiquement

2.  En tant que visiteur, je veux voir les détails d'une recette.

    **Scenario** : Voir une recette spécifique

        Étant donné que je suis un visiteur
        Lorsque je clique sur une recette de la liste
        Alors je suis redirigé vers la page de la recette
        Et la page affiche toutes les informations de cette recette

3.  En tant que visiteur, je veux m'inscrire pour proposer mes recettes.

    **Scenario** : Inscription d'un nouvel utilisateur

        Étant donné que je suis un visiteur
        Lorsque je vais sur la page d'inscription
        Et que je remplis le formulaire avec mon email et mon mot de passe
        Alors je suis inscrit et redirigé vers la page de connexion

4.  En tant que visiteur, je veux me connecter pour accéder à mes recettes.

    **Scenario** : Connexion d'un utilisateur existant

        Étant donné que je suis un visiteur et que j'ai déjà un compte,
        Lorsque je vais sur la page de connexion et que j'entre mon email et mon mot de passe valides,
        Alors je suis connecté et redirigé vers mon espace personnel

5.  En tant qu'utilisateur, je veux voir mes recettes dans mon espace personnel.

    **Scenario** : Afficher les recettes de l'utilisateur connecté

        Étant donné que je suis un utilisateur connecté
        Lorsque j'accède à mon espace personnel
        Alors je vois la liste de toutes mes recettes

6.  En tant qu'utilisateur, je veux proposer une nouvelle recette.

    **Scenario** : Création d'une nouvelle recette

        Étant donné que je suis un utilisateur connecté
        Lorsque je clique sur "Ajouter une recette" et remplis le formulaire avec un titre, une image d'illustration et le contenu de ma recette,
        Alors la recette est ajoutée à la liste de mes recettes

7.  En tant qu'utilisateur, je veux modifier une recette existante.

    **Scenario** : Modification d'une recette

        Étant donné que je suis un utilisateur connecté,
        Lorsque je clique sur le bouton "Modifier ma recette",
        Et modifie ses informations dans le formulaire,
        Alors la recette est mise à jour

8.  En tant qu'utilisateur, je veux supprimer une recette.

    **Scenario** : Suppression d'une recette

        Étant donné que je suis un utilisateur connecté
        Lorsque je clique sur "Supprimer" pour une recette
        Alors la recette est supprimée de la liste de mes recettes

9.  En tant qu'utilisateur, je veux discuter avec le créateur d'une recette.

    **Scenario** : Chat en direct avec le créateur d'une recette

        Étant donné que je suis un utilisateur connecté
        Et que je suis sur la page de détail d'une recette,
        Lorsque je clique sur le bouton "Chat" pour ouvrir la fenêtre de chat,
        Alors une fenêtre de chat s'ouvre et je peux envoyer des messages au créateur de la recette,
        Et les messages sont échangés en temps réel avec le créateur

10. En tant qu'utilisateur, je veux me déconnecter de mon compte.

    **Scenario** : Déconnexion de l'utilisateur

        Étant donné que je suis un utilisateur connecté
        Lorsque je clique sur le bouton "Déconnexion"
        Alors je suis déconnecté de mon compte
        Et je suis redirigé vers la liste publique des recettes

# Améliorations possibles

## Fonctionnelles

- Gestion d'un compte utilisateur admin permettant de modérer les recettes postées et les messages dans les différents chats.

- Permettre à l'utilisateur de réinitialiser son mot de passe en cas d'oubli ou via son espace privé (avec envoi d'un email de vérification).

- Création de profils utilisateurs consultables par autrui, permettant de voir uniquement les recettes de ce profil.

- Permettre la recherche de recettes par différents critères (nom de la recette, ingrédients, auteur, etc.).

- Permettre à l'utilisateur de supprimer son compte.

## Techniques

- Utiliser l'Asset Pipeline de Rails pour gérer toutes les ressources front-end (JavaScript, CSS, images, etc.) dans un même système.

- Améliorer la gestion et l'affichage des erreurs backend.

- Optimiser l'affichage en mode responsive.

- Création de composants réutilisables pour respecter le principe DRY (Don't Repeat Yourself) dans le développement.
