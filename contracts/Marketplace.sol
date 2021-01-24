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
        string imagesUrl;

        uint256 price;
        uint256 squareFootage;

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
        string imagesUrl,
        uint256 price,
        uint256 squareFootage,
        address payable ownerAddress
    );

    event propertyBought(
        uint id,
        string offerTitle,
        string offerDescription,
        string addressLocation,
        string propertyType,
        string features,
        string imagesUrl,
        uint256 price,
        uint256 squareFootage,
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
        string memory _imagesUrl,
        uint256 _price,
        uint256 _squareFootage
    ) public {
        require(_price > 0);
        require(_squareFootage > 0);
        require(bytes(_imagesUrl).length > 0);

        offerCount++;

        properties[offerCount] = Property(
            offerCount,
            _offerTitle,
            _offerDescription,
            addressLocation,
            _propertyType,
            _features,
            _imagesUrl,
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
            _imagesUrl,
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
            _property.imagesUrl,
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

    function getMyProperties() public view returns (Property[] memory) {
        Property[] memory myProps = new Property[](offerCount + 1);

        for(uint i = 1; i < offerCount + 1; i++) {
            if (properties[i].ownerAddress == msg.sender) {
                myProps[i] = properties[i];
            }
        }

        return (myProps);
    }

    function getProperty(uint _id) public view returns (Property memory) {
        Property memory prop = properties[_id];
        return prop;
    }

    function getProperties() public view returns (Property[] memory) {
        Property[] memory props = new Property[](offerCount + 1);

        for(uint i = 1; i < offerCount + 1; i++) {
            props[i] = properties[i];
        }

        return (props);
    }

}
