import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AlertCircle, BookOpen, CheckCircle2, Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';
import { resendOtp, verifyStudentOtp } from '../lib/platform';

export default function OTPVerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'student@example.com';
  const purpose = location.state?.purpose === 'login' ? 'login' : 'register';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }

    setCanResend(true);
  }, [resendTimer]);

  const handleVerify = () => {
    setError('');
    setSuccess(false);
    setLoading(true);

    if (otp.length !== 6) {
      setError('Please enter the complete 6-digit code');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const result = verifyStudentOtp(email, otp);
      if (!result.ok) {
        setError(result.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      toast.success(purpose === 'login' ? 'Login verified successfully!' : 'Email verified successfully!');
      setTimeout(() => navigate('/dashboard'), 1500);
    }, 800);
  };

  const handleResend = () => {
    const result = resendOtp(email);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    setResendTimer(60);
    setCanResend(false);
    toast.success(`Verification code resent. Demo OTP: ${result.otp}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <span className="font-bold text-2xl">MDCAT Prep</span>
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Verify your email</CardTitle>
            <CardDescription>
              Enter the 6-digit OTP sent to
              <br />
              <span className="font-medium text-gray-900">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-50 text-green-900 border-green-200">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>Verification complete. Redirecting to student dashboard...</AlertDescription>
                </Alert>
              )}

              <div className="rounded-lg bg-slate-50 p-3 text-center text-sm text-slate-600">
                Demo OTP for this frontend build: <span className="font-semibold text-slate-900">123456</span>
              </div>

              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp} disabled={loading || success}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button onClick={handleVerify} className="w-full" disabled={loading || success || otp.length !== 6}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Verified!
                  </>
                ) : (
                  'Verify Email'
                )}
              </Button>

              <div className="text-center text-sm space-y-2">
                <p className="text-gray-600">Did not receive the code?</p>
                {canResend ? (
                  <button onClick={handleResend} className="text-blue-600 hover:underline font-medium">
                    Resend code
                  </button>
                ) : (
                  <p className="text-gray-500">
                    Resend available in <span className="font-medium text-gray-900">{resendTimer}s</span>
                  </p>
                )}
              </div>

              <div className="pt-4 border-t text-center text-sm">
                <button
                  onClick={() => navigate(purpose === 'login' ? '/login' : '/register')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Change email address
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <button onClick={() => navigate('/')} className="text-sm text-gray-600 hover:text-gray-900">
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
