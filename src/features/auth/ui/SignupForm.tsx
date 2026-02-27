'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, User } from 'lucide-react';

import { ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shared/ui/InputGroup';
import { FormField } from '@/shared/ui/FormField';
import { cn } from '@/shared/lib/utils';
import { ApiError } from '@/shared/api/ApiError';

import {
  signupSchema,
  SignupFormValues,
  CATEGORIES,
} from '../model/authSchema';
import { authApi } from '../api/authApi';
import { useUserStore } from '@/entities/user';

const CATEGORY_LABELS: Record<string, string> = {
  STUDY: '스터디',
  EXERCISE: '운동',
  PROJECT: '프로젝트',
  HOBBY: '취미',
  CULTURE_ART: '문화/예술',
};

export default function SignupForm() {
  const router = useRouter();
  const login = useUserStore((state) => state.login);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      categories: [],
    },
  });

  const selectedCategories = watch('categories');

  const toggleCategory = (category: (typeof CATEGORIES)[number]) => {
    const current = selectedCategories || [];
    const next = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category];
    setValue('categories', next, { shouldValidate: true });
  };

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const res = await authApi.signup(data);
      if (res.isSuccess) {
        // 성공 시 자동 로그인 처리
        login({
          id: res.result.id,
          email: data.email,
          name: data.name,
        });
        alert('회원가입이 완료되었습니다!');
        router.replace(ROUTES.HOME);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        alert(error.message);
      } else {
        alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <h2 className="text-xl font-bold">회원가입 🚀</h2>
        <p className="text-sm text-gray-500">
          새로운 계정을 만들고 시작해보세요.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormField label="이름" required error={errors.name?.message}>
          <InputGroup>
            <InputGroupAddon>
              <User className="h-4 w-4 text-gray-400" />
            </InputGroupAddon>
            <InputGroupInput
              {...register('name')}
              type="text"
              placeholder="이름 (닉네임)"
            />
          </InputGroup>
        </FormField>

        <FormField label="이메일" required error={errors.email?.message}>
          <div className="flex gap-x-2">
            <InputGroup className="w-full">
              <InputGroupAddon>
                <Mail className="h-4 w-4 text-gray-400" />
              </InputGroupAddon>
              <InputGroupInput
                {...register('email')}
                type="email"
                placeholder="이메일"
              />
            </InputGroup>
            <Button type="button" variant="outline" className="shrink-0">
              인증
            </Button>
          </div>
        </FormField>

        <FormField label="비밀번호" required error={errors.password?.message}>
          <InputGroup>
            <InputGroupAddon>
              <Lock className="h-4 w-4 text-gray-400" />
            </InputGroupAddon>
            <InputGroupInput
              {...register('password')}
              type="password"
              placeholder="비밀번호 (영문, 숫자 포함 8자 이상)"
            />
          </InputGroup>
        </FormField>

        <FormField
          label="비밀번호 확인"
          required
          error={errors.confirmPassword?.message}
        >
          <InputGroup>
            <InputGroupAddon>
              <Lock className="h-4 w-4 text-gray-400" />
            </InputGroupAddon>
            <InputGroupInput
              {...register('confirmPassword')}
              type="password"
              placeholder="비밀번호를 한번 더 입력해주세요"
            />
          </InputGroup>
        </FormField>

        <FormField
          label="관심 카테고리 (중복 선택 가능)"
          required
          error={errors.categories?.message}
        >
          <div className="flex flex-wrap gap-2 pt-1">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategories?.includes(category);
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-xs font-semibold transition-all',
                    isSelected
                      ? 'border-brand-500 bg-brand-50 text-brand-600'
                      : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                  )}
                >
                  {CATEGORY_LABELS[category]}
                </button>
              );
            })}
          </div>
        </FormField>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 justify-center py-6 text-base font-bold"
        >
          {isSubmitting ? '처리 중...' : '회원가입 완료'}
        </Button>
      </form>

      <div className="flex justify-center text-sm text-gray-500">
        이미 계정이 있으신가요?
        <Link
          href={ROUTES.AUTH.LOGIN}
          className="ml-2 underline hover:text-gray-800"
          replace
        >
          로그인하기
        </Link>
      </div>
    </div>
  );
}
