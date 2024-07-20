// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;


contract Package{

    struct package {
        string trackingCode;
        string orderDate;
        string orderStatus;
        string deliveryAddress;
        string deliveryEstimation;
        string productName;
        uint quantity;
        uint totalPrice;
        string lastUpdate;
    }


    package[] public packagesList;
    mapping (string => package) packages;

    
    event cretaedPackage(string productName, string orderDate);
    event updatedPackageStatus(string trackingCode, string newStatus);

    function createPackage(string memory trackingCode,
        string memory orderDate,
        string memory orderStatus,
        string memory deliveryAddress,
        string memory deliveryEstimation,
        string memory productName,
        uint quantity,
        uint totalPrice,
        string memory lastUpdate) public {
            package memory newPackage = package(trackingCode, orderDate, orderStatus, deliveryAddress, deliveryEstimation, productName, quantity, totalPrice, lastUpdate);
            packagesList.push(newPackage);
            packages[newPackage.trackingCode] = newPackage;
            emit cretaedPackage(productName, orderDate);
        }

    function getPackages() public view returns(package[] memory){
        return packagesList;
    }

    function getPackageByTrackingCode(string memory trackingCode) public view returns(package memory){
        return packages[trackingCode];
    }

    function updateOrderStatus(string memory trackingCode, string memory newStatus, string memory lastUpdate) public {
        require(bytes(packages[trackingCode].trackingCode).length != 0, "Package not found");
        packages[trackingCode].orderStatus = newStatus;
         packages[trackingCode].lastUpdate = lastUpdate;

        for (uint i = 0; i < packagesList.length; i++) {
            if (compareStrings(packagesList[i].trackingCode, trackingCode)) {
                packagesList[i].orderStatus = newStatus;
                packagesList[i].lastUpdate = lastUpdate;
                break;
            }
        }

        emit updatedPackageStatus(trackingCode, newStatus);
    }

    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b)));
    }

}
