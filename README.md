# La Tambouille

## Installation

Pour démarrer l'application avec Docker :

```sh
docker compose up
```

Pour réinitialiser la base de donnée :

```sh
docker compose exec web bundle exec rails db:prepare
```

l'API tourne sur `localhost:3000`.

## Accès au Trello

Pour accéder au tableau Trello du projet, c'est par ici :

https://trello.com/b/fgqgG5HS/la-tambouille

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
