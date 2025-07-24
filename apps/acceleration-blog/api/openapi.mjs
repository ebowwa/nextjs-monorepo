
const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Blog API",
    version: "1.0.0",
    description: "API for blog post operations"
  },
  servers: [
    {
      url: "https://a-cell.vercel.app/api/",
      description: "Production server"
    }
  ],
  paths: {
    "/posts/all": {
      "get": {
        "summary": "Get all posts",
        "operationId": "getAllPosts",
        "responses": {
          "200": {
            "description": "List of all posts",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Post"
                  }
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/posts/search": {
      "get": {
        "summary": "Search posts by keywords",
        "operationId": "searchPosts",
        "parameters": [
          {
            "name": "keywords",
            "in": "query",
            "description": "Keywords to search in posts",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "List of posts matching the keywords",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Post"
                  }
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/posts/sorting": {
      "get": {
        "summary": "Sort posts",
        "operationId": "sortPosts",
        "parameters": [
          {
            "name": "sortBy",
            "in": "query",
            "description": "Attribute to sort by",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "order",
            "in": "query",
            "description": "Order of sorting ('asc' or 'desc')",
            "required": true,
            "schema": {
              "type": "string",
              "enum": ["asc", "desc"]
            }
          }
        ],
        "responses": {
          "200": {
            "description": "List of sorted posts",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Post"
                  }
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Post: {
        type: "object",
        properties: {
          data: {
            type: "object",
            description: "Metadata of the post"
          },
          content: {
            type: "string",
            description: "Content of the post"
          }
        }
      }
    }
  }
};

export default function handler(req, res) {
  res.status(200).json(openApiSpec);
}