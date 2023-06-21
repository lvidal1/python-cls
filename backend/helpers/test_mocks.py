def MockAuthyVerifyFactory(success):
    class MockVerify:
        def ok(self):
            return success

    return MockVerify()


def MockAuthyUsersFactory(success):
    class MockAuthy:
        def create(self, *args):
            class MockCreate:
                def __init__(self):
                    self.id = "mock_id"

                def ok(self):
                    return success

            return MockCreate()

        def status(self, *args):
            class MockCreate:
                def __init__(self):
                    self.id = "mock_id"

                def ok(self):
                    return False

            return MockCreate()

        def request_call(self, *args):
            class MockRequestCall:
                def ok(self):
                    return success

            return MockRequestCall()

        def request_sms(self, *args):
            class MockRequestSMS:
                def ok(self):
                    return success

            return MockRequestSMS()

    return MockAuthy


def MockBoto3Factory(success):
    class MockBoto3Instance:
        def client(self, *args, **kwargs):
            class MockS3Instance:
                def __init__(self):
                    pass

                def generate_presigned_post(self, Bucket="", Key="", **kwargs):
                    if success:
                        return {
                            "url": "https://testurl.com/",
                            "fields": {
                                "key": "1-1568238282-test.jpg",
                                "AWSAccessKeyId": "TESTAWSACCESSKEY",
                                "signature": "testsignature=",
                            },
                        }

            return MockS3Instance()

    return MockBoto3Instance


mock_source = {
    "id": "mock_source_id",
    "name": "Natalie Rosa",
    "exp_month": 12,
    "exp_year": 2021,
    "last4": "1111",
}


class MockSources(dict):
    def __init__(self, *args, **kwargs):
        super(MockSources, self).__init__(*args, **kwargs)
        self.__dict__ = self
        self.object = "list"


mock_sources = MockSources()
mock_sources.update(
    {
        "data": [mock_source],
    }
)


class MockOrder(dict):
    def __init__(self, *args, **kwargs):
        super(MockOrder, self).__init__(*args, **kwargs)
        self.__dict__ = self
        self.id = "mock_order_id"


mock_order = MockOrder()


mock_customer = {
    "id": "mock_customer_id",
    "sources": mock_sources,
    "default_source": mock_source["id"],
}

mock_charge = {
    "id": "mock_charge_id",
    "object": "charge",
    "amount": 100,
    "currency": "usd",
    "paid": True,
}


def MockStripeFactory(deleted_source=False):
    class StripeMock:
        @property
        def Customer(self):
            class MockCustomerManager:
                class MockCustomer:
                    def __init__(self):
                        self.id = "mock_customer_id"

                def create(*args, **kwargs):
                    return MockCustomerManager.MockCustomer()

                def modify(*args, **kwargs):
                    return mock_customer

                def retrieve(*args, **kwargs):
                    return mock_customer

                def list_sources(*args, **kwargs):
                    if deleted_source:
                        return []
                    return mock_sources

                def create_source(*args, **kwargs):
                    return mock_source

                def delete_source(*args, **kwargs):
                    return mock_customer

            return MockCustomerManager()

        @property
        def Charge(self):
            class MockChargeManager:
                def create(*args, **kwargs):
                    return mock_charge

            return MockChargeManager()

        @property
        def Order(self):
            class MockOrderManager:
                def create(*args, **kwargs):
                    return mock_order

                def pay(*args, **kwargs):
                    return mock_order

            return MockOrderManager()

    return StripeMock()
