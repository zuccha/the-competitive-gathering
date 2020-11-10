import React from 'react'
import { IRequestStatus } from '../../../types/RequestStatus'

interface IRequestSwitchProps {
  status: IRequestStatus
  renderInitial?: () => React.ReactElement
  renderLoading?: () => React.ReactElement
  renderFailure?: () => React.ReactElement
  renderSuccess?: () => React.ReactElement
}

const RequestSwitch: React.FC<IRequestSwitchProps> = ({
  status,
  renderInitial = () => null,
  renderLoading = () => null,
  renderFailure = () => null,
  renderSuccess = () => null,
}) => {
  if (status === 'initial') { return renderInitial() }
  if (status === 'loading') { return renderLoading() }
  if (status === 'failure') { return renderFailure() }
  return renderSuccess()
}

export default RequestSwitch
