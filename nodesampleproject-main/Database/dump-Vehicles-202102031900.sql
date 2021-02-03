--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

-- Started on 2021-02-03 19:00:19

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
-- TOC entry 3036 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 207 (class 1259 OID 16532)
-- Name: CarImages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CarImages" (
    id integer NOT NULL,
    "CarId" integer,
    "ImageName" character varying(100) NOT NULL,
    "CreatedDate" timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."CarImages" OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16530)
-- Name: CarImages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."CarImages" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."CarImages_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 204 (class 1259 OID 16484)
-- Name: Cars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cars" (
    id integer NOT NULL,
    "Name" character varying(20) NOT NULL,
    "MakerId" integer NOT NULL,
    "ModelId" integer NOT NULL
);


ALTER TABLE public."Cars" OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16487)
-- Name: Cars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Cars" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Cars_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 201 (class 1259 OID 16437)
-- Name: Makers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Makers" (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public."Makers" OWNER TO postgres;

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
-- TOC entry 3037 (class 0 OID 0)
-- Dependencies: 200
-- Name: make_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.make_id_seq OWNED BY public."Makers".id;


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
-- TOC entry 3038 (class 0 OID 0)
-- Dependencies: 202
-- Name: model_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.model_id_seq OWNED BY public."Models".id;


--
-- TOC entry 209 (class 1259 OID 16546)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(30) NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16544)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3039 (class 0 OID 0)
-- Dependencies: 208
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2876 (class 2604 OID 16440)
-- Name: Makers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Makers" ALTER COLUMN id SET DEFAULT nextval('public.make_id_seq'::regclass);


--
-- TOC entry 2877 (class 2604 OID 16450)
-- Name: Models id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Models" ALTER COLUMN id SET DEFAULT nextval('public.model_id_seq'::regclass);


--
-- TOC entry 2879 (class 2604 OID 16549)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3028 (class 0 OID 16532)
-- Dependencies: 207
-- Data for Name: CarImages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CarImages" (id, "CarId", "ImageName", "CreatedDate") FROM stdin;
1	4	car-1612104315233.jpeg	2021-01-31 20:15:15
3	3	car-1612105571670.jpeg	2021-01-31 20:36:12
4	4	car-1612160656726.jpeg	2021-02-01 11:54:17
\.


--
-- TOC entry 3025 (class 0 OID 16484)
-- Dependencies: 204
-- Data for Name: Cars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cars" (id, "Name", "MakerId", "ModelId") FROM stdin;
1	i20	9	7
3	swift	9	8
5	alto	10	8
6	alto k10	11	9
4	Brezza	11	9
\.


--
-- TOC entry 3022 (class 0 OID 16437)
-- Dependencies: 201
-- Data for Name: Makers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Makers" (id, name) FROM stdin;
1	Maker 1
2	Maker 2
3	Maker 3
4	Maker 4
5	Maker 5
6	Maker 6
9	Maker 7
10	Maker 10
11	Maruti Suzuki
12	Hyundai
\.


--
-- TOC entry 3024 (class 0 OID 16447)
-- Dependencies: 203
-- Data for Name: Models; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Models" (id, "Name") FROM stdin;
1	Model 1
2	Model 2
3	Model 3
4	Model 4
5	Model 5
6	Model 6
7	Model 7
8	Model 10
9	VXI
10	TDCI
\.


--
-- TOC entry 3030 (class 0 OID 16546)
-- Dependencies: 209
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password) FROM stdin;
1	test@test.com	123456
\.


--
-- TOC entry 3040 (class 0 OID 0)
-- Dependencies: 206
-- Name: CarImages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CarImages_id_seq"', 4, true);


--
-- TOC entry 3041 (class 0 OID 0)
-- Dependencies: 205
-- Name: Cars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cars_id_seq"', 6, true);


--
-- TOC entry 3042 (class 0 OID 0)
-- Dependencies: 200
-- Name: make_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.make_id_seq', 12, true);


--
-- TOC entry 3043 (class 0 OID 0)
-- Dependencies: 202
-- Name: model_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.model_id_seq', 10, true);


--
-- TOC entry 3044 (class 0 OID 0)
-- Dependencies: 208
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 2887 (class 2606 OID 16536)
-- Name: CarImages CarImages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CarImages"
    ADD CONSTRAINT "CarImages_pkey" PRIMARY KEY (id);


--
-- TOC entry 2885 (class 2606 OID 16493)
-- Name: Cars cars_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cars"
    ADD CONSTRAINT cars_pk PRIMARY KEY (id);


--
-- TOC entry 2881 (class 2606 OID 16457)
-- Name: Makers make_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Makers"
    ADD CONSTRAINT make_pk PRIMARY KEY (id);


--
-- TOC entry 2883 (class 2606 OID 16455)
-- Name: Models model_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Models"
    ADD CONSTRAINT model_pk PRIMARY KEY (id);


--
-- TOC entry 2888 (class 2606 OID 16494)
-- Name: Cars cars_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cars"
    ADD CONSTRAINT cars_fk FOREIGN KEY (id) REFERENCES public."Makers"(id);


--
-- TOC entry 2889 (class 2606 OID 16499)
-- Name: Cars cars_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cars"
    ADD CONSTRAINT cars_fk_1 FOREIGN KEY (id) REFERENCES public."Models"(id);


--
-- TOC entry 2890 (class 2606 OID 16537)
-- Name: CarImages fk_cars; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CarImages"
    ADD CONSTRAINT fk_cars FOREIGN KEY ("CarId") REFERENCES public."Cars"(id);


-- Completed on 2021-02-03 19:00:19

--
-- PostgreSQL database dump complete
--

