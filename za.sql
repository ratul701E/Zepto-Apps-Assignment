-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 23, 2024 at 07:22 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `za`
--

-- --------------------------------------------------------

--
-- Table structure for table `font`
--

CREATE TABLE `font` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `path` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `font`
--

INSERT INTO `font` (`id`, `name`, `path`) VALUES
(31, 'NotoSansShavian-Regular.ttf', '../uploads/fonts/NotoSansShavian-Regular.ttf'),
(34, 'fontawesome-webfont.ttf', '../uploads/fonts/fontawesome-webfont.ttf'),
(35, 'OpenSans-Regular.ttf', '../uploads/fonts/OpenSans-Regular.ttf'),
(36, 'Lato-Regular.ttf', '../uploads/fonts/Lato-Regular.ttf');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`) VALUES
(46, 'g1 (updated) v2'),
(49, 'Test Group');

-- --------------------------------------------------------

--
-- Table structure for table `group_mapped`
--

CREATE TABLE `group_mapped` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `font_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `size` int(11) NOT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group_mapped`
--

INSERT INTO `group_mapped` (`id`, `group_id`, `font_id`, `name`, `size`, `price`) VALUES
(67, 48, 31, 'daf', 2, 2),
(68, 48, 31, 'sdf', 3, 3),
(81, 46, 36, 'loto v2', 1, 2),
(82, 46, 35, 'sans v2', 3, 4),
(83, 46, 35, 'sans 2 v1', 100, 1200),
(86, 49, 34, 'Awesome', 2, 1),
(87, 49, 31, 'Noto', 5, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `font`
--
ALTER TABLE `font`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_mapped`
--
ALTER TABLE `group_mapped`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `font`
--
ALTER TABLE `font`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `group_mapped`
--
ALTER TABLE `group_mapped`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
