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
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS cards_pk;
ALTER TABLE IF EXISTS public.cards ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.cards_pid_seq;
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
    id integer NOT NULL,
    image text,
    value integer NOT NULL,
    name text NOT NULL,
    color text NOT NULL
);


ALTER TABLE public.cards OWNER TO miller;

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

ALTER SEQUENCE public.cards_pid_seq OWNED BY public.cards.id;


--
-- Name: cards id; Type: DEFAULT; Schema: public; Owner: miller
--

ALTER TABLE ONLY public.cards ALTER COLUMN id SET DEFAULT nextval('public.cards_pid_seq'::regclass);


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: miller
--

INSERT INTO public.cards (id, image, value, name, color) VALUES (18, '4C', 4, '4', 'Clubs');
INSERT INTO public.cards (id, image, value, name, color) VALUES (5, '4S', 4, '4', 'Spades');
INSERT INTO public.cards (id, image, value, name, color) VALUES (47, '7H', 7, '7', 'Hearts');
INSERT INTO public.cards (id, image, value, name, color) VALUES (9, '8S', 8, '8', 'Spades');
INSERT INTO public.cards (id, image, value, name, color) VALUES (13, 'QS', 10, 'Queen', 'Spades');
INSERT INTO public.cards (id, image, value, name, color) VALUES (3, '2S', 2, '2', 'Spades');
INSERT INTO public.cards (id, image, value, name, color) VALUES (6, '5S', 5, '5', 'Spades');
INSERT INTO public.cards (id, image, value, name, color) VALUES (11, '10S', 10, '10', 'Spades');
INSERT INTO public.cards (id, image, value, name, color) VALUES (42, '2H', 2, '2', 'Hearts');
INSERT INTO public.cards (id, image, value, name, color) VALUES (26, 'QC', 10, 'Queen', 'Clubs');
INSERT INTO public.cards (id, image, value, name, color) VALUES (16, '2C', 2, '2', 'Clubs');
INSERT INTO public.cards (id, image, value, name, color) VALUES (51, 'JH', 10, 'Jack', 'Hearts');
INSERT INTO public.cards (id, image, value, name, color) VALUES (17, '3C', 3, '3', 'Clubs');
INSERT INTO public.cards (id, image, value, name, color) VALUES (19, '5C', 5, '5', 'Clubs');
INSERT INTO public.cards (id, image, value, name, color) VALUES (50, '10H', 10, '10', 'Hearhs');
INSERT INTO public.cards (id, image, value, name, color) VALUES (53, 'KH', 10, 'King', 'Hearts');
INSERT INTO public.cards (id, image, value, name, color) VALUES (43, '3H', 3, '3', 'Hearts');
INSERT INTO public.cards (id, image, value, name, color) VALUES (12, 'JS', 10, 'Jack', 'Spades');
INSERT INTO public.cards (id, image, value, name, color) VALUES (48, '8H', 8, '8', 'Hearts');
INSERT INTO public.cards (id, image, value, name, color) VALUES (14, 'KS', 10, 'King', 'Spades');
INSERT INTO public.cards (id, image, value, name, color) VALUES (7, '6S', 6, '6', 'Spades');
INSERT INTO public.cards (id, image, value, name, color) VALUES (24, '10C', 10, '10', 'Clubs');
INSERT INTO public.cards (id, image, value, name, color) VALUES (25, 'JC', 10, 'Jack', 'Clubs');
INSERT INTO public.cards (id, image, value, name, color) VALUES (45, '5H', 5, '5', 'Hearts');
INSERT INTO public.cards (id, image, value, name, color) VALUES (2, 'AS', 1, 'Ace', 'Spades');
INSERT INTO public.cards (id, image, value, name, color) VALUES (30, '3D', 3, '3', 'Diamonds');
INSERT INTO public.cards (id, image, value, name, color) VALUES (49, '9H', 9, '9', 'Hearts');
INSERT INTO public.cards (id, image, value, name, color) VALUES (41, 'AH', 1, 'Ace', 'Hearts');
INSERT INTO public.cards (id, image, value, name, color) VALUES (27, 'KC', 10, 'King', 'Clubs');
INSERT INTO public.cards (id, image, value, name, color) VALUES (46, '6H', 6, '6', 'Hearts');
INSERT INTO public.cards (id, image, value, name, color) VALUES (34, '7D', 7, '7', 'Diamonds');
INSERT INTO public.cards (id, image, value, name, color) VALUES (4, '3S', 3, '3', 'Spades');
INSERT INTO public.cards (id, image, value, name, color) VALUES (28, 'AD', 1, 'Ace', 'Diamonds');
INSERT INTO public.cards (id, image, value, name, color) VALUES (20, '6C', 6, '6', 'Clubs');
INSERT INTO public.cards (id, image, value, name, color) VALUES (52, 'QH', 10, 'Queen', 'Hearts');
INSERT INTO public.cards (id, image, value, name, color) VALUES (21, '7C', 7, '7', 'Clubs');
INSERT INTO public.cards (id, image, value, name, color) VALUES (36, '9D', 9, '9', 'Diamonds');
INSERT INTO public.cards (id, image, value, name, color) VALUES (38, 'JD', 10, 'Jack', 'Diamonds');
INSERT INTO public.cards (id, image, value, name, color) VALUES (8, '7S', 7, '7', 'Spades');
INSERT INTO public.cards (id, image, value, name, color) VALUES (22, '8C', 8, '8', 'Clubs');
INSERT INTO public.cards (id, image, value, name, color) VALUES (44, '4H', 4, '4', 'Hearts');
INSERT INTO public.cards (id, image, value, name, color) VALUES (35, '8D', 8, '8', 'Diamonds');
INSERT INTO public.cards (id, image, value, name, color) VALUES (29, '2D', 2, '2', 'Diamonds');
INSERT INTO public.cards (id, image, value, name, color) VALUES (32, '5D', 5, '5', 'Diamonds');
INSERT INTO public.cards (id, image, value, name, color) VALUES (23, '9C', 9, '9', 'Clubs');
INSERT INTO public.cards (id, image, value, name, color) VALUES (33, '6D', 6, '6', 'Diamonds');
INSERT INTO public.cards (id, image, value, name, color) VALUES (10, '9S', 9, '9', 'Spades');
INSERT INTO public.cards (id, image, value, name, color) VALUES (37, '10D', 10, '10', 'Diamonds');
INSERT INTO public.cards (id, image, value, name, color) VALUES (31, '4D', 4, '4', 'Diamonds');
INSERT INTO public.cards (id, image, value, name, color) VALUES (40, 'KD', 10, 'King', 'Diamonds');
INSERT INTO public.cards (id, image, value, name, color) VALUES (15, 'AC', 1, 'Ace', 'Clubs');
INSERT INTO public.cards (id, image, value, name, color) VALUES (39, 'QD', 10, 'Queen', 'Diamonds');


--
-- Name: cards_pid_seq; Type: SEQUENCE SET; Schema: public; Owner: miller
--

SELECT pg_catalog.setval('public.cards_pid_seq', 53, true);


--
-- Name: cards cards_pk; Type: CONSTRAINT; Schema: public; Owner: miller
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pk PRIMARY KEY (id);


--
-- Name: cards_pid_uindex; Type: INDEX; Schema: public; Owner: miller
--

CREATE UNIQUE INDEX cards_pid_uindex ON public.cards USING btree (id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

