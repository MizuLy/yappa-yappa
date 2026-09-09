# API documentation

Base URL: `/api`

Successful responses use `{ "status": "success", "data": ... }`. Errors use `{ "success": false, "message": "..." }` unless noted otherwise.

Protected endpoints require `Authorization: Bearer <access-token>`. The refresh token is stored in an HTTP-only `refreshToken` cookie after login.

## Health

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| GET | `/health` | No | Check API status, uptime, and timestamp |

## Authentication

### `POST /auth/register`

Create an account.

```json
{
  "name": "Yappa User",
  "email": "user@example.com",
  "password": "Password1!"
}
```

Password requirements: at least 8 characters, one letter, one number, and one special character.

### `POST /auth/login`

Authenticate with `{ "email": "user@example.com", "password": "Password1!" }`. Returns the user and access token, and sets the refresh-token cookie.

### `POST /auth/refresh`

Use the `refreshToken` cookie to receive a new access token.

### `POST /auth/logout` — protected

Clear the refresh-token cookie.

## Posts

Post and comment image uploads use `multipart/form-data` with the `images` field. Posts accept up to 5 images; comment endpoints accept up to 3.

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| POST | `/posts` | Yes | Create a post with optional `content` and `images` |
| GET | `/posts` | No | List all posts |
| GET | `/posts/:id` | No | Get one post and its images |
| PUT | `/posts/:id` | Yes | Update the owner's post; accepts `content` and optional `images` |
| DELETE | `/posts/:id` | Yes | Delete the owner's post |

## Comments

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| POST | `/posts/:postId/comments` | Yes | Add a comment with optional `content` and `images` |
| GET | `/posts/:postId/comments` | No | List comments for a post |
| GET | `/comments/:id` | No | Get one comment and its images |
| PATCH | `/comments/:id` | Yes | Update the owner's comment; accepts `content` and optional `images` |
| DELETE | `/comments/:id` | Yes | Delete the owner's comment |

## Likes

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| POST | `/posts/:postId/like` | Yes | Like a post |
| GET | `/posts/:postId/likes` | No | List post likes and count |
| DELETE | `/posts/:postId/like` | Yes | Unlike a post |
| POST | `/comments/:commentId/like` | Yes | Like a comment |
| GET | `/comments/:commentId/likes` | No | List comment likes and count |
| DELETE | `/comments/:commentId/like` | Yes | Unlike a comment |

## Follows

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| POST | `/follows/:userId/follow` | Yes | Follow a user |
| DELETE | `/follows/:userId/unfollow` | Yes | Unfollow a user |
| GET | `/follows/:userId/followers` | No | Get a user's followers and count |
| GET | `/follows/:userId/following` | No | Get users followed by a user and count |

## Notifications

Notifications are generated when another user likes a post/comment, comments on a post, or follows the user. Users do not receive notifications for their own actions.

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| GET | `/notifications?page=1&limit=20&unreadOnly=true` | Yes | List the authenticated user's notifications; `limit` is capped at 100 |
| GET | `/notifications/unread-count` | Yes | Get the authenticated user's unread count |
| PATCH | `/notifications/:id/read` | Yes | Mark one notification as read |
| PATCH | `/notifications/read-all` | Yes | Mark all notifications as read |
| DELETE | `/notifications/:id` | Yes | Delete one notification |
