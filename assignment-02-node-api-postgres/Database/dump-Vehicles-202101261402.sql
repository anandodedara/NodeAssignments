--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

-- Started on 2021-01-26 14:02:02

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
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3016 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 16460)
-- Name: Cars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cars" (
    id integer NOT NULL,
    "Name" text NOT NULL,
    "MakeId" integer NOT NULL,
    "ModelId" integer NOT NULL
);


ALTER TABLE public."Cars" OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16437)
-- Name: Make; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Make" (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public."Make" OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16447)
-- Name: Models; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Models" (
    id integer NOT NULL,
    "Name" text NOT NULL
);


ALTER TABLE public."Models" OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16458)
-- Name: cars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cars_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cars_id_seq OWNER TO postgres;

--
-- TOC entry 3017 (class 0 OID 0)
-- Dependencies: 204
-- Name: cars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cars_id_seq OWNED BY public."Cars".id;


--
-- TOC entry 200 (class 1259 OID 16435)
-- Name: make_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.make_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.make_id_seq OWNER TO postgres;

--
-- TOC entry 3018 (class 0 OID 0)
-- Dependencies: 200
-- Name: make_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.make_id_seq OWNED BY public."Make".id;


--
-- TOC entry 202 (class 1259 OID 16445)
-- Name: model_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.model_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.model_id_seq OWNER TO postgres;

--
-- TOC entry 3019 (class 0 OID 0)
-- Dependencies: 202
-- Name: model_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.model_id_seq OWNED BY public."Models".id;


--
-- TOC entry 2866 (class 2604 OID 16463)
-- Name: Cars id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cars" ALTER COLUMN id SET DEFAULT nextval('public.cars_id_seq'::regclass);


--
-- TOC entry 2864 (class 2604 OID 16440)
-- Name: Make id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Make" ALTER COLUMN id SET DEFAULT nextval('public.make_id_seq'::regclass);


--
-- TOC entry 2865 (class 2604 OID 16450)
-- Name: Models id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Models" ALTER COLUMN id SET DEFAULT nextval('public.model_id_seq'::regclass);


--
-- TOC entry 3010 (class 0 OID 16460)
-- Dependencies: 205
-- Data for Name: Cars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cars" (id, "Name", "MakeId", "ModelId") FROM stdin;
1	Car 1	1	1
2	Car 2	2	2
3	Car 3	3	3
\.


--
-- TOC entry 3006 (class 0 OID 16437)
-- Dependencies: 201
-- Data for Name: Make; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Make" (id, name) FROM stdin;
1	Make 1
2	Make 2
3	Make 3
4	Make 4
5	Make 5
\.


--
-- TOC entry 3008 (class 0 OID 16447)
-- Dependencies: 203
-- Data for Name: Models; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Models" (id, "Name") FROM stdin;
1	Model 1
2	Model 2
3	Model 3
4	Model 4
5	Model 5
\.


--
-- TOC entry 3020 (class 0 OID 0)
-- Dependencies: 204
-- Name: cars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cars_id_seq', 3, true);


--
-- TOC entry 3021 (class 0 OID 0)
-- Dependencies: 200
-- Name: make_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.make_id_seq', 5, true);


--
-- TOC entry 3022 (class 0 OID 0)
-- Dependencies: 202
-- Name: model_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.model_id_seq', 5, true);


--
-- TOC entry 2872 (class 2606 OID 16468)
-- Name: Cars cars_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cars"
    ADD CONSTRAINT cars_pk PRIMARY KEY (id);


--
-- TOC entry 2868 (class 2606 OID 16457)
-- Name: Make make_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Make"
    ADD CONSTRAINT make_pk PRIMARY KEY (id);


--
-- TOC entry 2870 (class 2606 OID 16455)
-- Name: Models model_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Models"
    ADD CONSTRAINT model_pk PRIMARY KEY (id);


--
-- TOC entry 2873 (class 2606 OID 16469)
-- Name: Cars cars_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cars"
    ADD CONSTRAINT cars_fk FOREIGN KEY (id) REFERENCES public."Make"(id);


--
-- TOC entry 2874 (class 2606 OID 16474)
-- Name: Cars cars_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cars"
    ADD CONSTRAINT cars_fk_1 FOREIGN KEY (id) REFERENCES public."Models"(id);


-- Completed on 2021-01-26 14:02:02

--
-- PostgreSQL database dump complete
--

