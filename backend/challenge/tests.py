from django.apps import apps
from django.conf import settings

from accounts.mocks import AccountMocks
from files.mocks import FileMocks
from helpers.test import DefaultSetup


class WriteMocksTest(DefaultSetup):
    def setUp(self):
        super(WriteMocksTest, self).setUp()

    def test_write_mocks(self):

        mocks = [
            AccountMocks,
            FileMocks,
        ]
        if apps.is_installed("devices"):
            from devices.mocks import DeviceMocks

            mocks.append(DeviceMocks)
        if apps.is_installed("invites"):
            from invites.mocks import InviteMocks

            mocks.append(InviteMocks)
        if apps.is_installed("wallet"):
            from wallet.mocks import WalletMocks

            mocks.append(WalletMocks)

        if settings.WRITE_MOCKS:
            [
                mock(
                    account=self.account, client=self.client
                ).call_write_methods_on_mocks_class()
                for mock in mocks
            ]
