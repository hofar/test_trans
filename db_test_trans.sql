PGDMP     3    .                 {         
   test_trans    15.3    15.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16396 
   test_trans    DATABASE     �   CREATE DATABASE test_trans WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE test_trans;
                postgres    false            �            1259    16467    transactions_id_seq    SEQUENCE     |   CREATE SEQUENCE public.transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.transactions_id_seq;
       public          postgres    false            �            1259    16407    transactions    TABLE       CREATE TABLE public.transactions (
    id integer DEFAULT nextval('public.transactions_id_seq'::regclass) NOT NULL,
    user_id integer,
    transaction_date date,
    items character varying(255),
    total_amount numeric,
    payment_status character varying(255)
);
     DROP TABLE public.transactions;
       public         heap    postgres    false    217            �            1259    16466    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false            �            1259    16397    users    TABLE       CREATE TABLE public.users (
    id integer DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
    username character varying(255),
    password character varying(255),
    name character varying(255),
    email character varying(255),
    gender character varying(255)
);
    DROP TABLE public.users;
       public         heap    postgres    false    216                       0    16407    transactions 
   TABLE DATA                 public          postgres    false    215   �       �          0    16397    users 
   TABLE DATA                 public          postgres    false    214   R       	           0    0    transactions_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.transactions_id_seq', 3, true);
          public          postgres    false    217            
           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public          postgres    false    216            o           2606    16411    transactions transactions_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_pkey;
       public            postgres    false    215            m           2606    16401    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    214            p           2606    16412    transactions users    FK CONSTRAINT     q   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT users FOREIGN KEY (user_id) REFERENCES public.users(id);
 <   ALTER TABLE ONLY public.transactions DROP CONSTRAINT users;
       public          postgres    false    215    214    3181                �   x�Ő�
�0@�~�mi!JM�
N
R�V�p�mZ����{B\�oy\Y�ť��j�0�{o�5��<�dG�!����ͬ_�P�C2,���	{��I��1G�R�	܎�kQC���#T��U��ҝ���'�[�	m'�CT�2J}D��(PLlEp	˾�eL�ſ��	��4      �   �   x�M��
�@F�>ſT�@Rڔ`f�]�D�FjjF���㧵iw��8�F�)?��P�%��r�p�I�%bX�q�W��~3D�
7\�Q ]��l� ���RA�e������:2��j:�u�
�eH�>t�an���콾B�H��gZ����rz��M�!�%e!�Y�;�     