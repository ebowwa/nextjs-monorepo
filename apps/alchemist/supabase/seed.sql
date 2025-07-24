SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.5 (Ubuntu 15.5-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '8924c148-4cfc-449a-9bf0-03830d8c30c6', '{"action":"user_confirmation_requested","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2024-03-03 19:03:28.106646+00', ''),
	('00000000-0000-0000-0000-000000000000', '951fd08c-4d26-42af-bc15-5680d9437c7f', '{"action":"user_signedup","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"team"}', '2024-03-03 19:06:32.958522+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c626b9b9-a896-4cab-83eb-d0d8b23caa78', '{"action":"login","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-03-03 19:06:53.400924+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd08bf360-faa0-43a6-b243-a0e0fcdb563d', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-03 20:19:27.145761+00', ''),
	('00000000-0000-0000-0000-000000000000', '411a468d-65e3-4bab-9d90-eba29e457e89', '{"action":"token_revoked","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-03 20:19:27.14636+00', ''),
	('00000000-0000-0000-0000-000000000000', '3526dfc7-0cf2-4559-9074-4dd7b12b2b21', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-03 20:19:28.615537+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b6ee8a94-41c8-4a6d-bd4d-54867853a5bc', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-03 20:19:38.46347+00', ''),
	('00000000-0000-0000-0000-000000000000', '7c4817a7-bd16-4e15-930e-0996d13bd2a3', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-03 20:19:39.172288+00', ''),
	('00000000-0000-0000-0000-000000000000', '4521c1bd-b55a-4f0f-a771-269f39ae4263', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-03 20:19:39.207107+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b29cbf29-d98e-47d2-94b1-bad0aea46217', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-03 20:19:39.714631+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a06501bc-f108-4e01-be15-f6756536b032', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-03 20:19:40.216788+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ae4e381e-fcdb-4e11-8a39-64cb5bab3767', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-03 20:19:41.154571+00', ''),
	('00000000-0000-0000-0000-000000000000', '5a0cca8a-2630-484d-8d21-0cbf490834f4', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-03 20:19:41.171869+00', ''),
	('00000000-0000-0000-0000-000000000000', '28d679d7-d936-4168-9ef2-215ceefd0fb5', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-03 20:19:45.425805+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c3863591-b64e-427c-8f77-52e92ad1fb18', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-03 20:19:45.811418+00', ''),
	('00000000-0000-0000-0000-000000000000', '6ff51d9a-e90e-4563-95df-49a8f94ca1c6', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-03 20:19:45.820802+00', ''),
	('00000000-0000-0000-0000-000000000000', '603703df-6675-4b13-887e-bb2224177f3f', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-03 20:19:46.320267+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c321c3dd-15d4-4db4-91a2-4d90bf26feb7', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-03 20:19:46.541628+00', ''),
	('00000000-0000-0000-0000-000000000000', '2308b838-0fc7-4227-a0cc-f7dd4af0561b', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-03 20:19:46.813896+00', ''),
	('00000000-0000-0000-0000-000000000000', '5fd66a35-6548-4d7e-8f23-53220787f01c', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-03 20:19:47.152891+00', ''),
	('00000000-0000-0000-0000-000000000000', '4809bcd5-30c3-4085-97b7-c0f1463206b5', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-03 20:19:47.587559+00', ''),
	('00000000-0000-0000-0000-000000000000', '1af3f587-55cd-439f-80b2-9f2cfef45eee', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-03 20:19:51.064392+00', ''),
	('00000000-0000-0000-0000-000000000000', '82a3c40d-4090-4e0f-8739-bd06c648a20a', '{"action":"login","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-03-03 20:54:55.636805+00', ''),
	('00000000-0000-0000-0000-000000000000', '1e6e9356-b711-4050-bac5-53f8b6577c0a', '{"action":"logout","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-03-03 20:55:05.744458+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd8539a85-4525-4996-acad-055253a1c60b', '{"action":"login","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-03-04 05:28:38.952354+00', ''),
	('00000000-0000-0000-0000-000000000000', 'de234aac-cd46-4876-b483-1958f3967c94', '{"action":"login","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-03-04 20:56:25.095172+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c3db65df-8977-45a9-84a4-70dd0014f6d9', '{"action":"login","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-03-04 22:05:02.765733+00', ''),
	('00000000-0000-0000-0000-000000000000', '4e27eee6-d78b-4d20-b60d-adbc61ed7772', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-04 23:03:23.111229+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b4affc93-3264-4744-b9e7-c086593ad0ca', '{"action":"token_revoked","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-04 23:03:23.111765+00', ''),
	('00000000-0000-0000-0000-000000000000', '3114a48d-cf72-46be-a9fe-9d522b924175', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-05 00:03:35.546192+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bab2681d-5285-4ad2-b9e4-f79d1357cf58', '{"action":"token_revoked","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-05 00:03:35.546866+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e0f2ae51-13fb-47b6-a25d-6a31826e1306', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-05 00:55:04.257292+00', ''),
	('00000000-0000-0000-0000-000000000000', '716c34b8-73ab-4df8-a991-c183b2f12495', '{"action":"token_revoked","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-05 00:55:04.257915+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bdd6e4dd-ca54-45f2-9061-fb43872a9673', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-05 01:04:06.288193+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bff3b44d-c82b-4b88-9f95-fc25fca7c23f', '{"action":"token_revoked","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-05 01:04:06.289043+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e1299140-21c3-4728-94fe-3fc386ef2fe6', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-05 03:15:09.162595+00', ''),
	('00000000-0000-0000-0000-000000000000', '68b46e97-5098-404e-998a-494777dcac48', '{"action":"token_revoked","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-05 03:15:09.163185+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ef143371-1055-4ebb-becc-c6e97fd3b2e8', '{"action":"logout","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-03-05 03:15:11.505044+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f76908b7-2642-42e4-b1d7-2d66363f1aca', '{"action":"login","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-03-05 03:34:02.185677+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c09a1d54-a443-4fd8-bcc8-abd4994d1473', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-05 04:45:19.642509+00', ''),
	('00000000-0000-0000-0000-000000000000', '2fa44e7e-fb5a-4e79-8138-04ce119f0f64', '{"action":"token_revoked","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-05 04:45:19.643072+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e625cf78-7706-472d-afb7-e77d56969a58', '{"action":"logout","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-03-05 04:50:08.24167+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dc1ada9e-9d34-4e43-a374-bdba004df221', '{"action":"login","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-03-05 20:29:27.404686+00', ''),
	('00000000-0000-0000-0000-000000000000', '09ff2774-54fa-4101-93f7-0d1e0df1dda5', '{"action":"login","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-03-05 20:56:14.345856+00', ''),
	('00000000-0000-0000-0000-000000000000', '63d8cc00-90c7-4e13-b8f8-9e25800fa7d5', '{"action":"logout","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-03-05 20:56:19.652837+00', ''),
	('00000000-0000-0000-0000-000000000000', '64292ae1-be6b-4172-a336-8fdefaf51833', '{"action":"login","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-03-05 21:04:12.995847+00', ''),
	('00000000-0000-0000-0000-000000000000', '6a32009a-7872-408b-b74a-4cd0791e07f6', '{"action":"logout","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-03-05 21:12:11.196565+00', ''),
	('00000000-0000-0000-0000-000000000000', '67ceaabe-141a-4aad-948b-1b1adeedd5e0', '{"action":"login","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-03-05 21:12:24.07316+00', ''),
	('00000000-0000-0000-0000-000000000000', '8dff4047-f994-46df-9bd4-e939602a7caa', '{"action":"logout","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-03-05 21:12:28.385686+00', ''),
	('00000000-0000-0000-0000-000000000000', '5ba5a4fa-78ce-417d-ad43-e303072be85e', '{"action":"login","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-03-06 05:56:26.251307+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e5e32e1f-a083-4d04-83eb-8acfafa91480', '{"action":"token_refreshed","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-06 08:27:34.617864+00', ''),
	('00000000-0000-0000-0000-000000000000', '4a6eb8fc-72c7-44c1-90b9-fab817eebf2e', '{"action":"token_revoked","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-03-06 08:27:34.620198+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c4033642-fb54-4810-abaf-69ed7e2d395d', '{"action":"login","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-03-06 08:39:09.055067+00', ''),
	('00000000-0000-0000-0000-000000000000', '64e810c3-3ab1-4518-b8d9-d3e0bcc797a6', '{"action":"logout","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-03-06 08:41:27.679559+00', ''),
	('00000000-0000-0000-0000-000000000000', '41fda51e-a25e-4d6a-8feb-c26fd3d8c310', '{"action":"login","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-03-06 22:51:49.964341+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c20f83ff-e132-4e70-9209-81e1162b0e06', '{"action":"login","actor_id":"5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc","actor_username":"ec.arbee1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-03-06 23:49:47.418623+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method") VALUES
	('5f03745b-e90b-4470-8152-098da34e5d50', '5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc', '76b1e076-28a7-4d4b-addd-27e02c95c154', 's256', 'u0Piv7SCAuWyD1djUOHbKfYHRvkHpqHRkyzGBC10dkM', 'email', '', '', '2024-03-03 19:03:28.10748+00', '2024-03-03 19:03:28.10748+00', 'email/signup');


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at") VALUES
	('00000000-0000-0000-0000-000000000000', '5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc', 'authenticated', 'authenticated', 'ec.arbee1@gmail.com', '$2a$10$ZPHg47fPmT4C7JgudM.Ygex4gAPlmba4P1IWwbghfZ2oXvlUp90eW', '2024-03-03 19:06:32.959338+00', NULL, '', '2024-03-03 19:03:28.111456+00', '', NULL, '', '', NULL, '2024-03-06 23:49:47.419256+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-03-03 19:03:28.095281+00', '2024-03-06 23:49:47.421189+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc', '5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc', '{"sub": "5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc", "email": "ec.arbee1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-03-03 19:03:28.105459+00', '2024-03-03 19:03:28.105506+00', '2024-03-03 19:03:28.105506+00', 'eb50a344-b44f-4cde-ae5e-7d4efb783c46');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('07456cf2-c326-42ad-8144-284721f32822', '5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc', '2024-03-06 22:51:49.965065+00', '2024-03-06 22:51:49.965065+00', NULL, 'aal1', NULL, NULL, 'node', '44.192.74.248', NULL),
	('c69fede9-eecc-4284-883a-85dffb6aaa16', '5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc', '2024-03-06 23:49:47.419328+00', '2024-03-06 23:49:47.419328+00', NULL, 'aal1', NULL, NULL, 'node', '44.203.144.15', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('07456cf2-c326-42ad-8144-284721f32822', '2024-03-06 22:51:49.967239+00', '2024-03-06 22:51:49.967239+00', 'password', '659d81e6-1524-48e8-aac6-e5c56556e841'),
	('c69fede9-eecc-4284-883a-85dffb6aaa16', '2024-03-06 23:49:47.421473+00', '2024-03-06 23:49:47.421473+00', 'password', '74709c47-fc72-4a1f-aa90-95d513cdef6c');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 21, '0-hRm4uxGVIPLZ8yJEwsmg', '5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc', false, '2024-03-06 22:51:49.96583+00', '2024-03-06 22:51:49.96583+00', NULL, '07456cf2-c326-42ad-8144-284721f32822'),
	('00000000-0000-0000-0000-000000000000', 22, 'waM1AgYXZV2Avk8QjQvNcw', '5182f0fd-0e8e-4c9f-a4ef-a244c689fbfc', false, '2024-03-06 23:49:47.42012+00', '2024-03-06 23:49:47.42012+00', NULL, 'c69fede9-eecc-4284-883a-85dffb6aaa16');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: prices; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
	('static', 'static', NULL, '2024-03-05 22:59:05.126066+00', '2024-03-05 22:59:05.126066+00', true, false, NULL, NULL, NULL);


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id") VALUES
	('c6b2f6f9-85b9-4cf8-bcfc-0b84e184668a', 'static', 'ui/.emptyFolderPlaceholder', NULL, '2024-03-06 01:05:43.613369+00', '2024-03-06 01:05:43.613369+00', '2024-03-06 01:05:43.613369+00', '{"eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "size": 0, "mimetype": "application/octet-stream", "cacheControl": "max-age=3600", "lastModified": "2024-03-06T01:05:44.000Z", "contentLength": 0, "httpStatusCode": 200}', 'c27c9295-62e5-4bf3-bad8-7b08bdbc3ae2', NULL),
	('b84100ac-f136-4b5f-b566-4dc1db14c8f1', 'static', 'ui/merchondemandlogo.png', NULL, '2024-03-06 01:05:54.463285+00', '2024-03-06 01:05:54.463285+00', '2024-03-06 01:05:54.463285+00', '{"eTag": "\"933f1d321221ab43692236b206ff077b\"", "size": 375563, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-03-06T01:05:55.000Z", "contentLength": 375563, "httpStatusCode": 200}', '00bed9e8-9c3b-4ae8-a9e7-95ca8aa99ffb', NULL);


--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 22, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
