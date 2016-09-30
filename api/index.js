module.exports = {
    "swagger": "2.0",
    "info": {
        "title": "AirControl API",
        "description": "Призван дать возможность управлять Вашим квадрокоптером через интернет",
        "version": "1.0.0"
    },
    "host": "api.copterapi.com",
    "schemes": [
                "https"
                ],
    "basePath": "/v1",
    "produces": [
                 "application/json"
                 ],
    "paths": {
        "/user": {
            "get": {
                "summary": "Информация о пользователе",
                "description": "Выдает информацию о текущем залогиненном пользователе по текущему ID сессии",
                "parameters": [
                               {
                               "name": "sessionID",
                               "in": "query",
                               "description": "ID of current session",
                               "required": true,
                               "type": "string"
                               }
                               ],
                "tags": [
                         "Пользователь"
                         ],
                "responses": {
                    "200": {
                        "description": "Пользовательская информация",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/User"
                            }
                        }
                    },
                    "401": {
                        "description": "Вы не авторизованы"
                    }
                }
            },
            "post": {
                "tags": [
                         "Пользователь"
                         ],
                "summary": "Добавление нового пользователя",
                "description": "",
                "consumes": [
                             "application/json"
                             ],
                "produces": [
                             "application/json"
                             ],
                "parameters": [
                               {
                               "in": "body",
                               "name": "body",
                               "description": "Отправка на сервер даннх о новом пользователе, которого нужно внести в Базу Данных",
                               "required": true,
                               "schema": {
                               "$ref": "#/definitions/User"
                               }
                               }
                               ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Session"
                            }
                        }
                    },
                    "405": {
                        "description": "Неверные данные"
                    }
                }
            },
            "delete": {
                "tags": [
                         "Пользователь"
                         ],
                "summary": "Удаление пользователя",
                "description": "Удаление пользователя из Базы Данных. Подтверждается вводом логина и пароля на клиентской стороне.",
                "consumes": [
                             "application/json"
                             ],
                "produces": [
                             "application/json"
                             ],
                "parameters": [
                               {
                               "in": "body",
                               "name": "body",
                               "description": "Объект пользователя вместе с ID сессией",
                               "required": true,
                               "schema": {
                               "$ref": "#/definitions/DeleteUser"
                               }
                               }
                               ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "403": {
                        "description": "Запрещено"
                    }
                }
            },
            "put": {
                "tags": [
                         "Пользователь"
                         ],
                "summary": "Изменение пользовательских данных",
                "description": "",
                "consumes": [
                             "application/json"
                             ],
                "produces": [
                             "application/json"
                             ],
                "parameters": [
                               {
                               "in": "body",
                               "name": "body",
                               "description": "ID сессии пользователя, чьи данные должны быть изменены",
                               "required": true,
                               "schema": {
                               "$ref": "#/definitions/Session"
                               }
                               }
                               ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "403": {
                        "description": "Запрещено"
                    }
                }
            }
        },
        "/session": {
            "get": {
                "summary": "Получение сессии пользователя",
                "description": "",
                "tags": [
                         "Сессия"
                         ],
                "responses": {
                    "200": {
                        "description": "Текущий ID сессии",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Session"
                            }
                        }
                    },
                    "401": {
                        "description": "Вы не авторизованы"
                    }
                }
            },
            "post": {
                "tags": [
                         "Сессия"
                         ],
                "summary": "Метод авторизации",
                "description": "",
                "consumes": [
                             "application/json"
                             ],
                "produces": [
                             "application/json"
                             ],
                "parameters": [
                               {
                               "in": "body",
                               "name": "body",
                               "description": "Объект пользователя для авторизации",
                               "required": true,
                               "schema": {
                               "$ref": "#/definitions/User"
                               }
                               }
                               ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Session"
                            }
                        }
                    },
                    "405": {
                        "description": "Неверные данные"
                    }
                }
            },
            "delete": {
                "tags": [
                         "Сессия"
                         ],
                "summary": "Очистка сессии",
                "description": "Метод для выхода пользователя из системы",
                "consumes": [
                             "application/json"
                             ],
                "produces": [
                             "application/json"
                             ],
                "parameters": [
                               {
                               "in": "body",
                               "name": "body",
                               "description": "Сессия, которая должна быть удалена",
                               "required": true,
                               "schema": {
                               "$ref": "#/definitions/Session"
                               }
                               }
                               ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Ошибка запроса"
                    }
                }
            }
        }
    },
    "definitions": {
        "User": {
            "type": "object",
            "properties": {
                "username": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                }
            }
        },
        "Session": {
            "type": "object",
            "properties": {
                "sessionID": {
                    "type": "string"
                }
            }
        },
        "DeleteUser": {
            "type": "object",
            "properties": {
                "password": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "sessionID": {
                    "type": "string"
                }
            }
        }
    }
}