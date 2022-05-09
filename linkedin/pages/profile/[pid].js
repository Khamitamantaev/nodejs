import { useRouter } from 'next/router'

const Profile = () => {
  const router = useRouter()
  const { pid } = router.query

  return <p>Profile: {pid}</p>
}

export default Profile