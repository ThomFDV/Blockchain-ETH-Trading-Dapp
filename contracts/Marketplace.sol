pragma solidity >=0.4.22 <0.9.0;

contract Marketplace {

    string name;

    uint offerCount;

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

    constructor(string memory _name) public {
        name = _name;
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
    }

}
