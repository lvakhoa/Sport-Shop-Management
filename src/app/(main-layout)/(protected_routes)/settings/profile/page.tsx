import { ProfileForm } from './profile-form'

export default function SettingProfilePage() {
  return (
    <div className='space-y-2'>
      <div>
        <span className='text-lg font-medium'>Profile</span>
      </div>
      <div className='my-[20px] w-full border-t border-gray-300'></div>
      <ProfileForm />
    </div>
  )
}
