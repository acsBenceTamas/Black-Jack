--
-- PostgreSQL database dump
--

-- Dumped from database version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

DROP INDEX IF EXISTS public.cards_pid_uindex;
DROP INDEX IF EXISTS public.cards_id_uindex;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS cards_pk;
ALTER TABLE IF EXISTS public.cards ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.cards ALTER COLUMN pid DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.cards_pid_seq;
DROP SEQUENCE IF EXISTS public.cards_id_seq;
DROP TABLE IF EXISTS public.cards;
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cards; Type: TABLE; Schema: public; Owner: miller
--

CREATE TABLE public.cards (
    pid integer NOT NULL,
    id integer NOT NULL,
    image text,
    value integer NOT NULL,
    name text NOT NULL,
    color text NOT NULL
);


ALTER TABLE public.cards OWNER TO miller;

--
-- Name: cards_id_seq; Type: SEQUENCE; Schema: public; Owner: miller
--

CREATE SEQUENCE public.cards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cards_id_seq OWNER TO miller;

--
-- Name: cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: miller
--

ALTER SEQUENCE public.cards_id_seq OWNED BY public.cards.id;


--
-- Name: cards_pid_seq; Type: SEQUENCE; Schema: public; Owner: miller
--

CREATE SEQUENCE public.cards_pid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cards_pid_seq OWNER TO miller;

--
-- Name: cards_pid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: miller
--

ALTER SEQUENCE public.cards_pid_seq OWNED BY public.cards.pid;


--
-- Name: cards pid; Type: DEFAULT; Schema: public; Owner: miller
--

ALTER TABLE ONLY public.cards ALTER COLUMN pid SET DEFAULT nextval('public.cards_pid_seq'::regclass);


--
-- Name: cards id; Type: DEFAULT; Schema: public; Owner: miller
--

ALTER TABLE ONLY public.cards ALTER COLUMN id SET DEFAULT nextval('public.cards_id_seq'::regclass);


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: miller
--

INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (10, 10, NULL, 9, '9', 'Spades');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (9, 9, NULL, 8, '8', 'Spades');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (8, 8, NULL, 7, '7', 'Spades');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (7, 7, NULL, 6, '6', 'Spades');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (6, 6, NULL, 5, '5', 'Spades');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (5, 5, NULL, 4, '4', 'Spades');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (4, 4, NULL, 3, '3', 'Spades');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (3, 3, NULL, 2, '2', 'Spades');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (2, 2, NULL, 1, 'Ace', 'Spades');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (14, 14, NULL, 10, 'King', 'Spades');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (13, 13, NULL, 10, 'Queen', 'Spades');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (12, 12, NULL, 10, 'Jack', 'Spades');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (11, 11, NULL, 10, '10', 'Spades');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (15, 15, NULL, 1, 'Ace', 'Clubs');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (16, 16, NULL, 2, '2', 'Clubs');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (17, 17, NULL, 3, '3', 'Clubs');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (18, 18, NULL, 4, '4', 'Clubs');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (19, 19, NULL, 5, '5', 'Clubs');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (20, 20, NULL, 6, '6', 'Clubs');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (21, 21, NULL, 7, '7', 'Clubs');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (22, 22, NULL, 8, '8', 'Clubs');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (23, 23, NULL, 9, '9', 'Clubs');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (24, 24, NULL, 10, '10', 'Clubs');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (25, 25, NULL, 10, 'Jack', 'Clubs');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (26, 26, NULL, 10, 'Queen', 'Clubs');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (27, 27, NULL, 10, 'King', 'Clubs');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (28, 28, NULL, 1, 'Ace', 'Diamonds');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (29, 29, NULL, 2, '2', 'Diamonds');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (30, 30, NULL, 3, '3', 'Diamonds');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (31, 31, NULL, 4, '4', 'Diamonds');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (32, 32, NULL, 5, '5', 'Diamonds');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (33, 33, NULL, 6, '6', 'Diamonds');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (34, 34, NULL, 7, '7', 'Diamonds');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (35, 35, NULL, 8, '8', 'Diamonds');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (36, 36, NULL, 9, '9', 'Diamonds');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (37, 37, NULL, 10, '10', 'Diamonds');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (38, 38, NULL, 10, 'Jack', 'Diamonds');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (39, 39, NULL, 10, 'Queen', 'Diamonds');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (40, 40, NULL, 10, 'King', 'Diamonds');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (41, 41, NULL, 1, 'Ace', 'Hearts');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (42, 42, NULL, 2, '2', 'Hearts');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (43, 43, NULL, 3, '3', 'Hearts');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (44, 44, NULL, 4, '4', 'Hearts');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (45, 45, NULL, 5, '5', 'Hearts');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (46, 46, NULL, 6, '6', 'Hearts');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (47, 47, NULL, 7, '7', 'Hearts');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (48, 48, NULL, 8, '8', 'Hearts');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (49, 49, NULL, 9, '9', 'Hearts');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (50, 50, NULL, 10, '10', 'Hearhs');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (51, 51, NULL, 10, 'Jack', 'Hearts');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (52, 52, NULL, 10, 'Queen', 'Hearts');
INSERT INTO public.cards (pid, id, image, value, name, color) VALUES (53, 53, NULL, 10, 'King', 'Hearts');


--
-- Name: cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: miller
--

SELECT pg_catalog.setval('public.cards_id_seq', 53, true);


--
-- Name: cards_pid_seq; Type: SEQUENCE SET; Schema: public; Owner: miller
--

SELECT pg_catalog.setval('public.cards_pid_seq', 53, true);


--
-- Name: cards cards_pk; Type: CONSTRAINT; Schema: public; Owner: miller
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pk PRIMARY KEY (pid);


--
-- Name: cards_id_uindex; Type: INDEX; Schema: public; Owner: miller
--

CREATE UNIQUE INDEX cards_id_uindex ON public.cards USING btree (id);


--
-- Name: cards_pid_uindex; Type: INDEX; Schema: public; Owner: miller
--

CREATE UNIQUE INDEX cards_pid_uindex ON public.cards USING btree (pid);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

