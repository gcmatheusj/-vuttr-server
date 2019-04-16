## Getting started

1. Clone this repo using `https://github.com/gcmatheusj/vuttr-server.git`
2. Move to the appropriate directory: `cd vuttr-server`.<br />
3. Run `yarn` to install dependencies.<br />
4. Create `.env` and `.env.test` file in `vuttr-server` with `URI=mongo_url` and `APP_SECRET=your_secret`<br />

### Sign-up:

`POST /users` (no authentication required): create a new user.

#### Body example:

```
{
  "name": "João Gabriel",
  "email": "joão@email.com",
  "password": "123123",
}
```

### Sign-in:

`POST /sessions` (no authentication required): create a new session.

#### Body example:

```
{
  "email": "joão@email.com",
  "password": "123123",
}
```

### Get person:

`GET /tools` (authentication required): gets all tools.

### Get tools by tags:

`GET /tools?tags=node` (authentication required): gets tools by tags.

### Create a new tool:

`POST /tools` (authentication required): creates a new tool.

#### Body example:

```
{
  "title": "hotel",
  "link": "https://github.com/typicode/hotel",
  "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
  "tags": ["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
}
```

### Update tool by id:

`PUT /tool/:id` (authentication required): update data for a specific tool.

#### Body example:

```
{
	"link": "https://notion.com.br",
  "tags": ["organization", "collaboration", "calendar"]
}
```

### Remove a tool:

`DELETE /tool/:id` (authentication required): removes a tool.
