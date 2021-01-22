pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Marketplace {

    uint256 public offerCount;

    struct Property {
        uint id;
        string offerTitle;
        string offerDescription;
        string addressLocation;
        string propertyType;
        string features;

        uint16 price;
        uint16 squareFootage;

        address payable ownerAddress;
    }

    mapping(uint => Property) public properties;

    event propertyAdded(
        uint id,
        string offerTitle,
        string offerDescription,
        string addressLocation,
        string propertyType,
        string features,
        uint16 price,
        uint16 squareFootage,
        address payable ownerAddress
    );

    event propertyBought(
        uint id,
        string offerTitle,
        string offerDescription,
        string addressLocation,
        string propertyType,
        string features,
        uint16 price,
        uint16 squareFootage,
        address payable ownerAddress
    );

    constructor() public {
        offerCount = 0;
    }

    function sellProperty(
        string memory _offerTitle,
        string memory _offerDescription,
        string memory addressLocation,
        string memory _propertyType,
        string memory _features,
        uint16 _price,
        uint16 _squareFootage
    ) public {
        require(_price > 0);
        require(_squareFootage > 0);

        offerCount++;

        properties[offerCount] = Property(
            offerCount,
            _offerTitle,
            _offerDescription,
            addressLocation,
            _propertyType,
            _features,
            _price,
            _squareFootage,
            msg.sender
        );
        emit propertyAdded(
            offerCount,
            _offerTitle,
            _offerDescription,
            addressLocation,
            _propertyType,
            _features,
            _price,
            _squareFootage,
            msg.sender
        );
    }

    function buyProperty(uint _propertyId) public payable {
        Property memory _property = properties[_propertyId];
        require(msg.value >= _property.price);
        address(_property.ownerAddress).transfer(msg.value);
        _property.ownerAddress = msg.sender;
        emit propertyBought(
            _propertyId,
            _property.offerTitle,
            _property.offerDescription,
            _property.addressLocation,
            _property.propertyType,
            _property.features,
            _property.price,
            _property.squareFootage,
            msg.sender
        );
        delete properties[_propertyId];
        offerCount--;
    }

    function getOfferCount() public view returns (uint256) {
        return offerCount;
    }

    function getMyProperties() public returns (Property[] memory) {
        Property[] memory myProps = new Property[](offerCount);

        for(uint i = 0; i < offerCount; i++) {
            if (properties[i].ownerAddress == msg.sender) {
                myProps[i] = properties[i];
            }
        }

        return myProps;
    }

    function getProperty(uint _id) public returns (Property memory) {
        Property memory prop = properties[_id];
        return prop;
    }

    function getProperties() public returns (Property[] memory) {
        Property[] memory props = new Property[](offerCount);

        for(uint i = 0; i < offerCount; i++) {
            props[i] = properties[i];
        }

        return (props);
    }

//    function getProperty(uint _id) public returns (
//        uint id,
//        string memory offerTitle,
//        string memory offerDescription,
//        string memory addressLocation,
//        string memory propertyType,
//        string memory features,
//        uint16 price,
//        uint16 squareFootage,
//        address ownerAddress
//    ) {
//        Property memory p = properties[_id];
//        return (
//            p.id,
//            p.offerTitle,
//            p.offerDescription,
//            p.addressLocation,
//            p.propertyType,
//            p.features,
//            p.price,
//            p.squareFootage,
//            p.ownerAddress
//        );
//    }

//    function getProperties() public returns (
//        uint[] idArray,
//        string[] offerTitleArray,
//        string[] offerDescriptionArray,
//        string[] addressLocationArray,
//        string[] propertyTypeArray,
//        string[] featuresArray,
//        uint16[] priceArray,
//        uint16[] squareFootageArray,
//        address[] ownerAddressArray
//    ) {
//        Property memory p = properties[_id];
//        return (
//        p.id,
//        p.offerTitle,
//        p.offerDescription,
//        p.addressLocation,
//        p.propertyType,
//        p.features,
//        p.price,
//        p.squareFootage,
//        p.ownerAddress
//        );
//    }

//    function getPropertiesId() public view returns (uint[] memory) {
//        uint[] memory ids = new uint[](offerCount);
//
//        for(uint i = 0; i < offerCount; i++) {
//            ids[i] = properties[i].id;
//        }
//
//        return (ids);
//    }

//    function getPropertiesTitle() public view returns (string[] memory) {
//        string[] memory titles = new string[](offerCount);
//
//        for(uint i = 0; i < offerCount; i++) {
//            titles[i] = properties[i].offerTitle;
//        }
//
//        return (titles);
//    }

    /* TODO:
     ? Ajouter une fonction pour lister sa propriété avec ownerAddress
    */


}
