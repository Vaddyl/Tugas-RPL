-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2018 at 06:56 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `emergencypal`
--

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `address` text NOT NULL,
  `contact` varchar(15) NOT NULL,
  `lat` float(10,6) NOT NULL,
  `lng` float(10,6) NOT NULL,
  `type` varchar(30) NOT NULL,
  `review` decimal(2,1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`, `address`, `contact`, `lat`, `lng`, `type`, `review`) VALUES
(1, 'Rumah Sakit Antam Medika', 'Jl. Pemuda Raya No.1A, Pulogadung RT.2/RW.7, Jatinegara Kaum Pulo Gadung Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13210, Indonesia', '02129378943', -6.192673, 106.902679, 'hospital', '4.2'),
(2, 'Rumah Sakit Harapan Jayakarta', 'Jalan Raya Bekasi Blok KM No.18, RT.6/RW.11, Jatinegara, Cakung, RT.7/RW.11, Jatinegara, Cakung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13030, Indonesia', '0214608886', -6.195104, 106.905769, 'hospital', '3.8'),
(3, 'Rumah Sakit Islam Jakarta Pondok Kopi', 'Jl. Raya pondok kopi, Pondok Kopi, Duren Sawit, RT.2/RW.1, Pd. Kopi, Duren Sawit, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13460', '02129809000', -6.195119, 106.905777, 'hospital', '3.7');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(300) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `email` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `name`, `email`) VALUES
(2, 'wowowowow', '12470a84073519f129653019341c3cc2c35cc370087b90ac11867f0e278bd4cd', 'wowowow', '14anoynmos@gmail.com'),
(3, 'johny', '88f200b77cccee4a6e95c383d33e0f22', 'Johny ', 'johny@gmail.com'),
(4, 'fadil14', '60e440022112dcf5780ead2a16e8610a', 'Fadil Agung', 'fafil@gmaolo.com'),
(5, '', 'd41d8cd98f00b204e9800998ecf8427e', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
